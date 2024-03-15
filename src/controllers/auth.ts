import { Request, Response } from "express"
import { pool } from "../../db"
import { Auth } from "../queries"
import jwt from "jsonwebtoken"

export const getToken = async (req: Request, res: Response) => {
    let status = 417
    let msg = "Unexpected params"
    const { email } = req.body
    if (email === undefined) return res.status(status).send(msg)

    const client = await pool.connect()

    try {
        const { rows } = await client.query(Auth.getPatient, [email])
        if (rows.length === 0) return res.status(404).send("NO PATIENT FOUND.")

        const token = jwt.sign({ email }, process.env.JWT_SECRET || '', { expiresIn: '7d' });
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
