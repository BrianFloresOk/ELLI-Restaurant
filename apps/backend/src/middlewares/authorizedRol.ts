import { NextFunction, Request, Response } from "express";

export const authorizedRol = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const userRole = req.cookies.user.role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                status: false,
                code: 403,
                message: 'No autorizado: rol no permitido',
            });
        }

        next();
    };
};
