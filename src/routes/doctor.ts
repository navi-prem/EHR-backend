import express, { Router } from "express"
import { verifyDoctorToken } from "../middlewares"
import { checkEmail } from "../controllers"
import { Sendotp } from "../controllers"

const BASE_ROUTE: string = '/doctor'
const router: Router = express.Router()

router.post('/check-email', verifyDoctorToken, checkEmail)
router.post('/send-mail', verifyDoctorToken, Sendotp)

export default { BASE_ROUTE, router }
