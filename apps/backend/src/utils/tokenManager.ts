import jwt from "jsonwebtoken";
import { Config } from "../config/config";
import { JwtPayload } from "../types/JwtPayload";
import { TokenGenerator, Payload } from "domain-elli";

const ACCESS_SECRET = Config.jwt.access.secret;
const REFRESH_SECRET = Config.jwt.refresh.secret;

export const tokenManager: TokenGenerator & { generateRefresh: (payload: Payload) => Promise<string>, verifyRefresh: (token: string) => Promise<Payload | null> } = {
    async generate(payload: Payload): Promise<string> {
        return jwt.sign(payload as object, ACCESS_SECRET, { expiresIn: Config.jwt.access.expiresIn });
    },

    async verify(token: string): Promise<Payload | null> {
        try {
            const decoded = jwt.verify(token, ACCESS_SECRET) as JwtPayload;
            return { ...decoded, id: Number(decoded.id) } as Payload;
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) return null;
            throw error;
        }
    },

    async generateRefresh(payload: Payload): Promise<string> {
        return jwt.sign(payload as object, REFRESH_SECRET, { expiresIn: Config.jwt.refresh.expiresIn });
    },

    async verifyRefresh(token: string): Promise<Payload | null> {
        try {
            const decoded = jwt.verify(token, REFRESH_SECRET) as JwtPayload;
            return { ...decoded, id: Number(decoded.id) } as Payload;
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) return null;
            throw error;
        }
    }
};
