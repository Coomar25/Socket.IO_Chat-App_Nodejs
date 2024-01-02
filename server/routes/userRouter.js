import express from "express";
import {
  getAllUsers,
  getSingleUser,
  login,
  registerUser,
} from "../controllers/UserController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/getuser/:id", getSingleUser);
router.get("/getAllUsers", getAllUsers);

export { router as userRouter };
