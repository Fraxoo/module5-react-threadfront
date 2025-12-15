import express from "express"
import { createPost, deletePost, getAllPostWithOffset, getPostWithRepliesOffset, updatePost } from "../controllers/postController.mjs"
import isLoggedInJWT from "../middlewares/isLoggedInJWT.mjs"

const router = express.Router();

router.get("/all/:offset", isLoggedInJWT(), getAllPostWithOffset);
router.get("/:id/:offset", isLoggedInJWT(), getPostWithRepliesOffset)



export default router;