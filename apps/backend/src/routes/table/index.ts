import express from "express";
const router = express.Router();

import { viewAllTables } from "../../controllers/table"


router.get("/", viewAllTables);

export default router;