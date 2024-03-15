import express, { Router } from "express"
import { getToken } from "../controllers"

const BASE_ROUTE: string = '/auth'
const router: Router = express.Router()

router.post('/get-token', getToken)

export default { BASE_ROUTE, router }
