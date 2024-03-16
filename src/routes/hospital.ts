import express, { Router } from "express"
import { verifyHospitalToken } from "../middlewares"

const BASE_ROUTE: string = '/hospital'
const router: Router = express.Router()

router.get('/get-doctors', verifyHospitalToken, )
router.post('/get-doctors', verifyHospitalToken, )
router.put('/get-doctors', verifyHospitalToken, )
router.delete('/get-doctors', verifyHospitalToken, )

export default { BASE_ROUTE, router }
