import express from "express";
import { closeOrder, createOrder, listOrders, modifyOrderItem, sendOrderToKitchen, viewOrderInfo } from "../../controllers/order";

const router = express.Router();

router.get("/", listOrders);
router.get("/:orderId", viewOrderInfo);
router.post("/", createOrder);
router.patch("/:orderId/items", modifyOrderItem);
router.patch("/:orderId/send", sendOrderToKitchen);
router.put("/:orderId/close", closeOrder);

export default router;