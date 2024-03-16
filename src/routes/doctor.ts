import express, { Router } from "express"
import { verifyDoctorToken } from "../middlewares"
import { checkEmail } from "../controllers"

const BASE_ROUTE: string = '/doctor'
const router: Router = express.Router()

router.post('/check-email', verifyDoctorToken, checkEmail)

export default { BASE_ROUTE, router }
