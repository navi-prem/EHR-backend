import { Request, Response } from "express"
import { pool } from "../../db"
import { Patient } from "../queries"

export const getPatient = async (req: Request, res: Response) => {
    const { email } = req.body

    if (!email) return res.status(417).send("Unexpected params.")

    const client = await pool.connect()
    try {
        const { rows } = await client.query(Patient.getPatient, [email])
        const { rows: treatments } = await client.query(Patient.getTreatments, [email])
        const { rows: conditions } = await client.query(Patient.getConditions, [email])
        rows[0].treatments = treatments
        rows[0].conditions = conditions
        client.release()
        return res.status(200).json(rows[0])
    } catch (err) {
        client.release()
        return res.status(400).send("Internal Server Error.")
    }
}

export const signUp = async (req: Request, res: Response) => {
    const { email, uid, pass, name, gender, dob, weight, height, address, bg } = req.body

    if (
        !email || !uid || !pass || !name || !gender || !dob || !weight || !height || !address || !bg 
    ) return res.status(417).send("Unexpected params.")

    const client = await pool.connect()

    try {
        await client.query(Patient.addPatient, [email, uid, pass, name, gender, dob, weight, height, address, bg])
        client.release()
        return res.status(200).send("Patient created successfully.")
    } catch (err) {
        console.log(err)
        client.release()
        return res.status(400).send("Internal Server Error.")
    }
}
