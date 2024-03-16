import { Request, Response } from "express"
import { pool } from "../../db"
import { Doctor, Patient } from "../queries"
import dotenv from "dotenv"
dotenv.config();
import * as AWS from "@aws-sdk/client-ses";
import nodemailer from "nodemailer";

export const checkEmail = async (req: Request, res: Response) => {
    const { email } = req.body
    if (!email) return res.status(417).send("Unexpected params.")

    const client = await pool.connect()

    try {
        const { rows } = await client.query(Patient.getPatient, [email])
        delete rows[0].pass

        client.release()
        return res.status(200).json(rows)
    } catch (err) {
        client.release()
        return res.status(400).send("Internal Server Error.")
    }
}

const ses = new AWS.SES({
    apiVersion: '2010-12-01',
    region: process.env.REGION || '',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY || '',
        secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
    },
});

const transporter = nodemailer.createTransport({
    SES: { ses, aws: AWS },
});

export const Sendotp = async (req: Request, res: Response) => {
    const { otp } = req.body;
    const { email } = req.body
    transporter.sendMail({
        from: process.env.VERIFIED_EMAIL,
        to: email,
        subject: "otp",
        html: `<html>${otp}</html>`,
    }, (err: Error | null) => {
        if (err) {
          return res
            .status(500)
            .json({ statusCode: 500, body: { message: "Error Sending Email" } });
        } else {
          return res
            .status(200)
            .json({ statusCode: 200, body: { message: "Email sent successfully" } });
   }
});
}

export const addCondition = async (req: Request, res: Response) => {
    const { value, onset, severity, email } = req.body

    if (
        !value || !onset || !severity || !email
    ) return res.status(417).send("Unexpected params.")

    const client = await pool.connect()

    try {
        await pool.query(Doctor.addCondition, [value, onset, severity, email])
        client.release()
        return res.status(200).send("Condition added successfully")
    } catch (err) {
        console.log(err)
        client.release()
        return res.status(400).send("Bad Request.")
    }
}

export const addTreatment = async (req: Request, res: Response) => {
    const { treatment_name, t_type, condition, doctor_id, in_time, out_time, pioneers, email } = req.body

    if (
        !treatment_name || !t_type || !condition || !doctor_id || !in_time || !out_time || !pioneers || !email
    ) return res.status(417).send("Unexpected params.")

    const client = await pool.connect()

    try {
        await pool.query(Doctor.addTreatment, [ treatment_name, t_type, condition, doctor_id, in_time, out_time, pioneers, email ])
        client.release()
        return res.status(200).send("Treatment added successfully")
    } catch (err) {
        console.log(err)
        client.release()
        return res.status(400).send("Bad Request.")
    }
}

export const updateRecord = async (req: Request, res: Response) => {
    const { email, sugar, bp, rbc, wbc, hb, platelets, esr, mcv, heart_rate, na, k, vitamin_d, cholestrol } = req.body

    if (
        !email || !sugar || !bp || !rbc || !wbc || !hb || !platelets || !esr || !mcv || !heart_rate || !na || !k || !vitamin_d || !cholestrol 
    ) {
        return res.status(417).send("Unexpected params.")
    }

    const client = await pool.connect()

    try {
        await client.query(Doctor.updateRecord, [email, sugar, bp, rbc, wbc, hb, platelets, esr, mcv, heart_rate, na, k, vitamin_d, cholestrol])
        client.release()
        return res.status(200).send("Records updated successfully.")
    } catch (err) {
        console.log(err)
        client.release()
        return res.status(400).send("Records failed to update.")
    }
}
