import express from "express"
import { createOrder } from "../../controllers/order/order.controller";

const router = express.Router();

router.post("/create-order", createOrder);


export default router;