import express from "express";
import { registerPayment } from "../../controllers/payment";

const router = express.Router();

router.post("/register", registerPayment);

export default router;