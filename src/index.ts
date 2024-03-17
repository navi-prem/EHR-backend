import express, { Express, Response } from "express"
import dotenv from "dotenv"
import cors from 'cors'
import { Auth, Doctor, Hospital, Patient } from "./routes"
import cookieParser from 'cookie-parser'

dotenv.config()

const app: Express = express()
const port: string = process.env.PORT || '3000'

const allowedOrigins = ["https://iiitdm-vashisht.vercel.app", "http://localhost:3000"];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 202,
};

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json())

// routes
app.use(Auth.BASE_ROUTE, Auth.router)
app.use(Patient.BASE_ROUTE, Patient.router)
app.use(Hospital.BASE_ROUTE, Hospital.router)
app.use(Doctor.BASE_ROUTE, Doctor.router)

app.get("/bs", (_, res: Response) => {
    return res.status(200).send(process.env.TEST_MSG || "Hello World!")
})

app.listen(port, () => {
   console.log(`[server]: http://localhost:${port}`)
})

export default app
