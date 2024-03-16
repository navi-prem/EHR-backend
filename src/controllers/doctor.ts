import { Request, Response } from "express"
import { pool } from "../../db"
import { Hospital, Patient } from "../queries"
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
    }, (err:string) => {
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
