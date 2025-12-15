import express from "express"
import { getAllData ,getPostById } from "../controllers/postController.mjs"


const router = express.Router();

router.get("/all", getAllData)
router.get("/:postId", getPostById)
//  MS create post router
 router.post("/create/post")


export default router