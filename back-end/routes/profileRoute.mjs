import express from "express"
import { getPostByUserId } from "../controllers/profileController.mjs"
import { isLoggedInJWT } from "../middlewares/isLoggedInJWT.mjs";

const router = express.Router();

router.get("/:userId", isLoggedInJWT(), getPostByUserId)


export default router