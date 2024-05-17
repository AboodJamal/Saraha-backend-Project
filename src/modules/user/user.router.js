import { Router } from "express";
import * as userController from "./user.controller.js"
import checkAuth from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utilities/errorHandiling.js";
import fileUpload from "../../utilities/multer.js";

const router = Router();

router.get("/profile",asyncHandler(checkAuth), asyncHandler(userController.profile));

router.patch("/profilePic",asyncHandler(checkAuth),fileUpload().single('image'), asyncHandler(userController.uploadImage));


export default router;