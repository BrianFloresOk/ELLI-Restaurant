import express, { Request, Response } from "express";

const router = express.Router();
import  adminRouter from "./admin";

router.get("/", (req: Request, res: Response) => {
    res.json("Hello World!");
});

router.use("/admin", adminRouter);


export default router;