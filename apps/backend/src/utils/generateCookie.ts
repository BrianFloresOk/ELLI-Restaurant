import { Response } from 'express';
import { Config } from '../config/config';

export const generateCookie = (res: Response, name: string, token: string, maxAge: number) => {
    return {
        cookie: res.cookie(name, token, {
            httpOnly: true,
            secure: Config.NODE_ENV === 'production',
            maxAge: maxAge,
            path: '/',
        })
    };
}