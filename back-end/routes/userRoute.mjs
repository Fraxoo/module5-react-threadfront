import express from "express"
import { register, login, logout, getMe } from "../controllers/userController.mjs";
import { isLoggedInJWT } from "../middlewares/isLoggedInJWT.mjs";



// ici on declare la suite de la route donc pour exemple la route /users ici on fait ce qu'il  y  a apres donc /users/login par exemple 
// ont declare la route principal dans le app.mjs  


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me",isLoggedInJWT(),getMe)

export default router