import express from "express"
import { addItemToOrder, createOrder, listOrders } from "../../controllers/order/order.controller";

const router = express.Router();

router.get("/orders", listOrders)
router.post("/create-order", createOrder);
router.post("/:orderId/items", addItemToOrder);


export default router;