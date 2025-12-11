import express from "express"
import { createComment, deleteComment ,getAllComments } from "../controllers/commentController.mjs"
import { isLoggedInJWT } from "../middlewares/isLoggedInJWT.mjs";

const router = express.Router();


router.post("/create", isLoggedInJWT(), createComment);
router.post("/delete", isLoggedInJWT(), deleteComment);
router.post("/:id",getCommentsByPostId);

export default router