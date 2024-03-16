import express, { Router } from "express"
import { verifyDoctorToken } from "../middlewares"
import { Sendotp, addCondition, addTreatment, checkEmail, updateRecord } from "../controllers"

const BASE_ROUTE: string = '/doctor'
const router: Router = express.Router()

router.post('/check-email', verifyDoctorToken, checkEmail)
router.post('/send-mail', verifyDoctorToken, Sendotp)
router.post('/add-condition', verifyDoctorToken, addCondition)
router.post('/add-treatment', verifyDoctorToken, addTreatment)
router.put('/update-record', verifyDoctorToken, updateRecord)

export default { BASE_ROUTE, router }
