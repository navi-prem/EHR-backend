import { Request, Response } from "express"
import { pool } from "../../db"
import { Hospital } from "../queries"

export const getDoctors = async (req: Request, res: Response) => {
    const client = await pool.connect()
    const { hospital_id } = req.body
    if (!hospital_id) return res.status(417).send("Unexpected params.")

    try {
        const { rows } = await client.query(Hospital.getDoctors, [hospital_id])
        client.release()
        return res.status(200).json(rows[0])
    } catch (err) {
        client.release()
        return res.status(400).send("Internal Server Error.")
    }
}
