import express, { Router } from "express"
import { verifyToken } from "../middlewares"
import { getPatient } from "../controllers"

const BASE_ROUTE: string = '/patients'
const router: Router = express.Router()

router.post('/get-patient', verifyToken, getPatient)

export default { BASE_ROUTE, router }
