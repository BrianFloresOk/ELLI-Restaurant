import express from "express";
import userRouter from "./user";
import productRouter from "./product";
import categoryRouter from "./category";

const router = express.Router();

router.use("/user", userRouter)
router.use("/product", productRouter)
router.use("/category", categoryRouter)

export default router;