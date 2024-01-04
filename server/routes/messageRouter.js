import express from "express";
import { createMessage, getMessage } from "../controllers/MessageController.js";
const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessage);

export { router as messageRouter };
