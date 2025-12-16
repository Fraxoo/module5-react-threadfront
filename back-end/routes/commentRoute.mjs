import express from "express"
import { createComment, deleteComment } from "../controllers/commentController.mjs"
import { isLoggedInJWT } from "../middlewares/isLoggedInJWT.mjs";

const router = express.Router();


router.post("/create", createComment);
router.post("/delete", deleteComment);

export default router