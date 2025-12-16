import express from "express"
import { getPostByUserId } from "../controllers/profileController.mjs"


const router = express.Router();

router.get("/:userId", getPostByUserId)


export default router