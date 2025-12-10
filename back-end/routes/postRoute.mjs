import express from "express"
import { getAllPosts ,getPostById } from "../controllers/postController.mjs"

const routeur = express.Router();

routeur.get("/get/all", getAllPosts)
routeur.get("/get/:id", getPostById)

export default routeur