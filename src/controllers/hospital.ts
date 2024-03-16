import { Request, Response } from "express"
import { pool } from "../../db"
import { Patient } from "../queries"

export const getDoctors = async (req: Request, res: Response) => {
    const client = await pool.connect()
    const { hospital_id } = req.body

    try {
        const { rows } = await client.query(Patient.getPatient, [email])
        client.release()
        return res.status(200).json(rows[0])
    } catch (err) {
        client.release()
        return res.status(500).send("Internal Server Error.")
    }
}
