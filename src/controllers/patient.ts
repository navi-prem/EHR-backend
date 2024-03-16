import { Request, Response } from "express"
import { pool } from "../../db"
import { Patient } from "../queries"

export const getPatient = async (req: Request, res: Response) => {
    const client = await pool.connect()
    const { email } = req.body

    try {
        const { rows } = await client.query(Patient.getPatient, [email])
        client.release()
        return res.status(200).json(rows[0])
    } catch (err) {
        client.release()
        return res.status(400).send("Internal Server Error.")
    }
}
