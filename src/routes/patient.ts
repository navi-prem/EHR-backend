import express, { Router } from "express"
import { verifyToken } from "../middlewares"
import { getPatient, proxy, signUp } from "../controllers"

const BASE_ROUTE: string = '/patient'
const router: Router = express.Router()

router.post('/get-patient', verifyToken, getPatient)
router.post('/sign-up', signUp)
router.post('/proxy', proxy)

export default { BASE_ROUTE, router }
