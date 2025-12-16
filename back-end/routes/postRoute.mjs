import express from "express"
import { getAllData ,getPostById,createPost } from "../controllers/postController.mjs"
import {isLoggedInJWT} from "../middlewares/isLoggedInJWT.mjs"

const router = express.Router();

router.get("/all", getAllData)
router.get("/:postId", getPostById)
//  MS create post router
router.post("/create/", isLoggedInJWT(), createPost)


export default router



//mettre en https 
//credentials include https
//comment sécuriser une app