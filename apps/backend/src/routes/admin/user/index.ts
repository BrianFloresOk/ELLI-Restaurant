import express from "express";
import { activateUser, createUser, deactivateUser, viewUserList } from "../../../controllers/admin/userController";

const router = express.Router();

router.post("/create-user", createUser)
router.post("/activate/:id", activateUser)
router.post("/deactivate/:id", deactivateUser)
router.get("/list", viewUserList)


export default router;