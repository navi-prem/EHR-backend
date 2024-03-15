import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import dotenv from 'dotenv'
dotenv.config()

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    const token = req.cookies['access_token'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const d: JwtPayload | string = jwt.verify(token, process.env.JWT_SECRET || '');
        console.log(typeof d)
        if (typeof d === 'object' && d?.email !== email) throw new Error("Not Authorized.")
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

export default verifyToken
