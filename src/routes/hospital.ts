import express, { Router } from "express"
import { verifyHospitalToken } from "../middlewares"
import { addDoctor, updateDoctor, deleteDoctor, getDetails } from "../controllers"

const BASE_ROUTE: string = '/hospital'
const router: Router = express.Router()

router.post('/add-doctor', verifyHospitalToken, addDoctor)
router.put('/update-doctor', verifyHospitalToken, updateDoctor)
router.delete('/delete-doctor', verifyHospitalToken, deleteDoctor)
router.post('/get-details', verifyHospitalToken, getDetails)

export default { BASE_ROUTE, router }
