import express, { Request, Response } from "express";

const router = express.Router();
import adminRouter from "./admin";
import authRouter from "./auth";
import orderRouter from "./orders"
import paymentRouter from "./payment";
import tableRouter from "./table";
import productRouter from "./product";
import categoryRouter from "./categories";
import { authenticateToken } from "../middlewares/authenticateToken";
import { authorizedRol } from "../middlewares/authorizedRol";

router.get("/", (req: Request, res: Response) => {
    res.json("Hello World!");
});

router.use("/admin", authenticateToken, authorizedRol(["ADMIN"]), adminRouter);

router.use("/auth", authRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);
router.use("/table", tableRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter)


export default router;