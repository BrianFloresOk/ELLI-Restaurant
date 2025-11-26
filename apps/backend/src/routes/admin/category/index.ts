import express from "express";
import { createCategory, viewAllCategories } from "../../../controllers/admin/categoryController"


const router = express.Router();

router.get("/", viewAllCategories)
router.post("/", createCategory)

export default router;