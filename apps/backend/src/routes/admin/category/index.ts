import express from "express";
import { viewAllCategories } from "apps/backend/src/controllers/admin/categoryController";


const router = express.Router();

router.get("/", viewAllCategories)

export default router;