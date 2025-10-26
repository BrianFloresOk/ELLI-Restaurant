import express from "express";
import { login, logout } from "../../controllers/auth";
import { authenticateToken } from "../../middlewares/authenticateToken";

const router = express.Router();

router.post("/login", login);
router.post("/logout", authenticateToken, logout);

export default router;