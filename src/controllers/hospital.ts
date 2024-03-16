import { Request, Response } from "express"
import { pool } from "../../db"
import { Hospital } from "../queries"

export const getDetails = async (req: Request, res: Response) => {
    const { hospital_id } = req.body
    if (!hospital_id) return res.status(417).send("Unexpected params.")

    const client = await pool.connect()

    try {
        const { rows } = await client.query(Hospital.getDetails, [hospital_id])
        const { rows: doctors } = await client.query(Hospital.getDoctors, [hospital_id])
        doctors.forEach(i => delete i.pass)
        rows[0].doctors = doctors
        client.release()
        return res.status(200).json(rows)
    } catch (err) {
        client.release()
        return res.status(400).send("Internal Server Error.")
    }
}

export const addDoctor = async (req: Request, res: Response) => {
    const { license_no, name, d_uid, pass, specialization, hospital_id } = req.body

    if (
        license_no === undefined ||
        name === undefined ||
        d_uid === undefined ||
        pass === undefined ||
        specialization === undefined ||
        hospital_id === undefined 
    ) return res.status(417).send("Unexpected body.")

    const client = await pool.connect()

    try {
        await client.query(Hospital.addDoctor, [license_no, name, d_uid, pass, specialization, hospital_id])
        client.release()
        return res.status(200).send("Doctor created successfully")
    } catch (err) {
        client.release()
        return res.status(400).json(err)
    }
}

export const updateDoctor = async (req: Request, res: Response) => {
    const { license_no, name, d_uid, pass, specialization, hospital_id, doctor_id } = req.body

    if (
        license_no === undefined ||
        name === undefined ||
        d_uid === undefined ||
        pass === undefined ||
        specialization === undefined ||
        hospital_id === undefined ||
        doctor_id === undefined
    ) return res.status(417).send("Unexpected body.")

    const client = await pool.connect()

    try {
        await client.query(Hospital.updateDoctor, [license_no, name, d_uid, pass, specialization, hospital_id, doctor_id])
        client.release()
        return res.status(200).send("Doctor updated successfully")
    } catch (err) {
        client.release()
        return res.status(400).json(err)
    }
}
export const deleteDoctor = async (req: Request, res: Response) => {
    const { doctor_id } = req.body
    if (!doctor_id) return res.status(417).send("Unexpected params.")

    const client = await pool.connect()

    try {
        const { rows } = await client.query(Hospital.deleteDoctor, [doctor_id])
        client.release()
        return res.status(200).send("Doctor deleted successfully.")
    } catch (err) {
        client.release()
        return res.status(400).send("Internal Server Error.")
    }
}
