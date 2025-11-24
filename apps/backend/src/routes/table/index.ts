import express from "express";
const router = express.Router();

import { viewAllTables, viewOrderOfTable } from "../../controllers/table"


router.get("/", viewAllTables);
router.get("/:id", viewOrderOfTable)

export default router;