import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import logger from "morgan";
import createError from "http-errors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import indexRouter from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();


app.use(cors());
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
