import express from "express"
import { createPost, deletePost, getAllPostWithOffset, getPostWithRepliesOffset, updatePost } from "../controllers/postController.mjs"
import { isLoggedInJWT } from "../middlewares/isLoggedInJWT.mjs"

const router = express.Router();

router.get("/all/:offset", isLoggedInJWT(), getAllPostWithOffset);
router.get("/:id/:offset", isLoggedInJWT(), getPostWithRepliesOffset);
router.post("/add", isLoggedInJWT(), createPost)
router.delete("/delete/:id", isLoggedInJWT(), deletePost);
router.put("/update/:id", isLoggedInJWT(), updatePost)



export default router;