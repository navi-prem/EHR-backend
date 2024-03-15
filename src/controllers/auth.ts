import { Request, Response } from "express"
import { pool } from "../../db"
import { Auth } from "../queries"
import jwt from "jsonwebtoken"

export const getToken = async (req: Request, res: Response) => {
    const { type } = req.body
    if (type === undefined) return res.status(417).send("Unexpected params.")

    if (type === 'D') {
        let status = 417
        let msg = "Unexpected params"
        const { email } = req.body
        if (email === undefined) return res.status(status).send(msg)

        const client = await pool.connect()

        try {
            const { rows } = await client.query(Auth.getPatient, [email])
            if (rows.length === 0) return res.status(404).send("NO PATIENT FOUND.")

            const token = jwt.sign({ email, type: 'D' }, process.env.DOCTOR_SECRET || '', { expiresIn: '7d' });
            res.cookie("access_token", token, { httpOnly: true, maxAge: 86400000 })
            status = 200
            msg = "Patient signed in successfully"
        } catch (err) {
            console.log(err)
            status = 500
            msg = "Internal Server Error."
        } finally {
            client.release()
            return res.status(status).send(msg)
        }
    } else if (type === 'H') {
        let status = 417
        let msg = "Unexpected params."
        const { uid, pass } = req.body
        if (uid === undefined || pass === undefined) return res.status(status).send(msg)

        const client = await pool.connect()

        try {
            const { rows } = await client.query(Auth.getAdmin, [uid])
            if (rows.length === 0) return res.status(404).send("NO DOCTOR FOUND.")

            const token = jwt.sign({ type: 'H', uid }, process.env.HOSPITAL_SECRET || '', { expiresIn: '7d' });
            res.cookie("access_token", token, { httpOnly: true, maxAge: 86400000 })
            status = 200
            msg = "Admin signed in successfully"
        } catch (err) {
            console.log(err)
            status = 500
            msg = "Internal Server Error."
        } finally {
            client.release()
            return res.status(status).send(msg)
        }
    } else {
        let status = 417
        let msg = "Unexpected params."
        const { uid, pass } = req.body
        if (uid === undefined || pass === undefined) return res.status(status).send(msg)

        const client = await pool.connect()

        try {
            const { rows } = await client.query(Auth.getPatient, [uid])
            if (rows.length === 0) return res.status(404).send("NO PATIENT FOUND.")

            const token = jwt.sign({ type: 'P', uid, email: rows[0].email }, process.env.PATIENT_SECRET || '', { expiresIn: '7d' });
            res.cookie("access_token", token, { httpOnly: true, maxAge: 86400000 })
            status = 200
            msg = "Patient signed in successfully"
        } catch (err) {
            console.log(err)
            status = 500
            msg = "Internal Server Error."
        } finally {
            client.release()
            return res.status(status).send(msg)
        }
    }
}
