import express from "express"
import { getPostsByUserLog } from "../controllers/profileController.mjs";
import { isLoggedInJWT } from "../middlewares/isLoggedInJWT.mjs";

const router = express.Router();

router.get("/me", isLoggedInJWT(), getPostsByUserLog)


export default router