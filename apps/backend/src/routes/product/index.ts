import express from "express";
import { viewAllProducts } from "../../controllers/product";
const router = express.Router();


router.get("/", viewAllProducts);

export default router;