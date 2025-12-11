import express from "express"
import { getAllPosts ,getPostById } from "../controllers/postController.mjs"


const router = express.Router();

router.get("/all", getAllData)
router.get("/:post_id", getPostById)
router.get("/:post_id/comments", getPostById)

export default router