import { Response } from 'express';
import { Config } from '../config/config';

export const generateCookie = (res: Response, name: string, token: string) => {
    return {
        cookie: res.cookie(name, token, {
            httpOnly: true,
            secure: Config.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 2,
            path: '/',
        })
    };
}