import express from "express"
import { getAllData ,getPostById } from "../controllers/postController.mjs"


const router = express.Router();

router.get("/all", getAllData)
router.get("/:post_id", getPostById)


export default router