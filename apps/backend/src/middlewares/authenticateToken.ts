import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../config/config";


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    const secretWord = Config.jwt.access.secret

    if (!token) {
        return res.status(401).json({
            status: false,
            code: 401,
            message: 'No autorizado: token no proporcionado',
        });
    }

    jwt.verify(token, secretWord, (err: any, decoded: any) => {
        if (err) {
            console.log('Error verificando token:', err.message);
            return res.status(403).json({
                status: false,
                code: 403,
                message: 'Token inválido o expirado',
            });
        }

        req.cookies.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    });
};