import express from "express";
import { login, logout, refreshToken } from "../../controllers/auth";
import { authenticateToken } from "../../middlewares/authenticateToken";

const router = express.Router();

router.post("/login", login);
router.post("/logout", authenticateToken, logout);
router.post("/refresh-token", refreshToken);

export default router;