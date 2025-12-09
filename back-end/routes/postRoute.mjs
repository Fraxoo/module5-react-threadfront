import express from "express"

import {
    getAllPosts
} from "../controllers/postController.mjs";

const routeur = express.Router();

routeur.get("/get/all", getAllPosts)

export default routeur