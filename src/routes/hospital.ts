import express, { Router } from "express"
import { verifyHospitalToken } from "../middlewares"
import { getDoctors } from "../controllers/hospital"

const BASE_ROUTE: string = '/hospital'
const router: Router = express.Router()

router.post('/get-doctors', verifyHospitalToken, getDoctors)
// router.post('/get-doctors', verifyHospitalToken, )
// router.put('/get-doctors', verifyHospitalToken, )
// router.delete('/get-doctors', verifyHospitalToken, )

export default { BASE_ROUTE, router }
