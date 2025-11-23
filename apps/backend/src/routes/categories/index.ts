import express from "express";
import { viewAllCategories } from "../../controllers/category";

const router = express.Router();


router.get("/", viewAllCategories);

export default router;