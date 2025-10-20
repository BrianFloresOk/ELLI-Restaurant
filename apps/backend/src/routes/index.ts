import express, { Request, Response } from "express";

const router = express.Router();
import adminRouter from "./admin";
import authRouter from "./auth";
import orderRouter from "./orders"
import paymentRouter from "./payment";

router.get("/", (req: Request, res: Response) => {
    res.json("Hello World!");
});

router.use("/admin", adminRouter);

router.use("/auth", authRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);


export default router;