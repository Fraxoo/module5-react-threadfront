import express from "express"
import { getAllData ,getPostById} from "../controllers/postController.mjs"


const router = express.Router();

router.get("/all", getAllData)
router.get("/:postId", getPostById)


export default router