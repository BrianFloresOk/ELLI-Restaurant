import express from "express";
import { viewOrdersPending } from "../../controllers/kitchen";

const router = express.Router();

router.get("/", viewOrdersPending);


export default router;