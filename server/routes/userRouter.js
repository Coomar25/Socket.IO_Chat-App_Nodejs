import express from "express";
import { registerUser } from "../controllers/UserController.js";
const router = express.Router();

router.get("/register", registerUser);
export { router as userRouter };
