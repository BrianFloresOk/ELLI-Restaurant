import express from "express";
import { createOrder, listOrders, modifyOrderItem } from "../../controllers/order/order.controller";

const router = express.Router();

router.get("/", listOrders);
router.post("/", createOrder);
router.patch("/:orderId/items", modifyOrderItem);

export default router;