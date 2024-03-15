import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import dotenv from 'dotenv'
dotenv.config()

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.body
    const token = req.cookies['access_token'];

    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

    if (type === 'D') {
        const { email } = req.body

        try {
            const d: JwtPayload | string = jwt.verify(token, process.env.DOCTOR_SECRET || '');
            if (typeof d === 'object' && d?.email !== email) throw new Error("Not Authorized.")
                next();
        } catch (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token', err });
        }
    } else if (type === 'H') {
        const { uid  } = req.body

        try {
            const d: JwtPayload | string = jwt.verify(token, process.env.HOSPITAL_SECRET || '');
            if (typeof d === 'object' && (d?.uid !== uid || d?.type !== type)) throw new Error("Not Authorized.")
                next();
        } catch (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token', err });
        }
    } else {
        const { uid, email } = req.body

        try {
            const d: JwtPayload | string = jwt.verify(token, process.env.PATIENT_SECRET || '');
            if (typeof d === 'object' && (d?.uid !== uid || d?.type !== type || d?.email !== email)) throw new Error("Not Authorized.")
                next();
        } catch (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token', err });
        }
    }
};

export default verifyToken
