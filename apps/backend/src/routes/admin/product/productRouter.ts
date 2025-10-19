import express from "express";
import { createProduct } from "../../../controllers/admin/productController";

const router = express.Router();

router.post("/create-product", createProduct)

export default router;