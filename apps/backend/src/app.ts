import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import logger from "morgan";
import createError from "http-errors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import indexRouter from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";
import { Config } from "./config/config";

const app = express();
const CORS_ORIGIN = Config.server.CORS_ORIGIN
const CORS_PRODUCTION = Config.server.CORS_PRODUCTION

const allowedOrigins = [
    CORS_ORIGIN,
    CORS_PRODUCTION,
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", indexRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404, "Ruta no encontrada"));
});

app.use(errorHandler)

export default app;
