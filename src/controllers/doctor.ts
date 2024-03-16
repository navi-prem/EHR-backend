import { Request, Response } from "express"
import { pool } from "../../db"
import { Hospital, Patient } from "../queries"

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
