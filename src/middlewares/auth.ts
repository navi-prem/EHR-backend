import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import dotenv from 'dotenv'
dotenv.config()

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.body

    if (type === 'D') {
        const { d_token: token } = req.body

        if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });
        const { uid } = req.body

        try {
            const d: JwtPayload | string = jwt.verify(token, process.env.DOCTOR_SECRET || '');
            if (typeof d === 'object' && d?.uid !== uid) throw new Error("Not Authorized.")
                next();
        } catch (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token', err });
        }
    } else if (type === 'H') {
        const { h_token: token } = req.body

        if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });
        const { uid  } = req.body

        try {
            const d: JwtPayload | string = jwt.verify(token, process.env.HOSPITAL_SECRET || '');
            if (typeof d === 'object' && (d?.uid !== uid || d?.type !== type)) throw new Error("Not Authorized.")
                next();
        } catch (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token', err });
        }
    } else if (type === 'P') {
        const { p_token: token } = req.body
        const { d_token } = req.body

        if (d_token) {
            try {
                const d: JwtPayload | string = jwt.verify(d_token, process.env.DOCTOR_SECRET || '');
                if (typeof d === 'object' && (d?.type !== 'D')) throw new Error("Not Authorized.")
                    next();
            } catch (err) {
                return res.status(403).json({ message: 'Forbidden: Invalid token', err });
            }
        } else if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        } else {
            try {
                const d: JwtPayload | string = jwt.verify(token, process.env.PATIENT_SECRET || '');
                if (typeof d === 'object' && (d?.type !== type)) throw new Error("Not Authorized.")
                if (typeof d === 'object') req.body.email = d?.email
                    next();
            } catch (err) {
                return res.status(403).json({ message: 'Forbidden: Invalid token', err });
            }
        }
    }
    else return res.status(417).send("Unexpected type.")
};

export default verifyToken
