import express from "express";
import { createOrder, listOrders, modifyOrderItem, sendOrderToKitchen } from "../../controllers/order/order.controller";

const router = express.Router();

router.get("/", listOrders);
router.post("/", createOrder);
router.patch("/:orderId/items", modifyOrderItem);
router.patch("/:orderId/send", sendOrderToKitchen);

export default router;