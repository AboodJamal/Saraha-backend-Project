
import { Router } from "express"; 
import * as messageController from "./message.controller.js"
import asyncHandler from "../../utilities/errorHandiling.js";
import checkAuth from "../../middleware/auth.middleware.js";
const router = Router();

router.get("/", asyncHandler(checkAuth),asyncHandler(messageController.getMessages));
router.post("/:receiverId", asyncHandler(messageController.sendMessage));


export default router;