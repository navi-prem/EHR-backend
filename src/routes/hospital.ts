import express, { Router } from "express"
import { verifyHospitalToken } from "../middlewares"
import { getDoctors, addDoctor, updateDoctor, deleteDoctor } from "../controllers"

const BASE_ROUTE: string = '/hospital'
const router: Router = express.Router()

router.post('/get-doctors', verifyHospitalToken, getDoctors)
router.post('/add-doctor', verifyHospitalToken, addDoctor)
router.put('/update-doctor', verifyHospitalToken, updateDoctor)
router.delete('/delete-doctor', verifyHospitalToken, deleteDoctor)

export default { BASE_ROUTE, router }
