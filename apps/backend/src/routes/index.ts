import express, { Request, Response } from "express";

const router = express.Router();
const adminRouter = require("./admin");

router.get("/", (req: Request, res: Response) => {
    res.json("Hello World!");
});

router.use("/admin", adminRouter);


export default router;