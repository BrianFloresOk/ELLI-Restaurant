import express, { Request, Response } from "express";
import { createUser } from "../../controllers/admin/createUser";

const router = express.Router();

router.post("/create-user", createUser)

export default router;