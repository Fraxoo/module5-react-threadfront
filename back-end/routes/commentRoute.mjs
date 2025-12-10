import express from "express"
import { createComment, deleteComment } from "../controllers/commentController.mjs"
import { isLoggedInJWT } from "../middlewares/isLoggedInJWT.mjs";

const router = express.Router();


router.post("/create", isLoggedInJWT(), createComment);
router.post("/delete", isLoggedInJWT(), deleteComment);


export default router