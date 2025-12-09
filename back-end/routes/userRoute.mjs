import express from "express"
import { register, login, logout } from "../controllers/userController.mjs";


// ici on declare la suite de la route donc pour exemple la route /users ici on fait ce qu'il  y  a apres donc /users/login par exemple 
// ont declare la route principal dans le app.mjs  


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router