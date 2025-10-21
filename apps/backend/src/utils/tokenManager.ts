import jwt from "jsonwebtoken";
import { Config } from "../config/config";
import { JwtPayload } from "../types/JwtPayload";
import { TokenGenerator } from "domain-elli";

const SECRET_WORD = Config.jwt.secret;
const EXPIRES_IN = Config.jwt.expiresIn;

export const tokenManager: TokenGenerator = {
    async generate(payload: JwtPayload): Promise<string> {
        return jwt.sign(payload, SECRET_WORD, { expiresIn: EXPIRES_IN });
    },

    async verify(token: string): Promise<JwtPayload | null> {
        try {
            const decoded = jwt.verify(token, SECRET_WORD) as JwtPayload;
            return decoded;
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return null;
            }
            throw error;
        }
    }
};
