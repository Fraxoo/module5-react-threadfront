import express from "express"
import { register, login } from "../controllers/userController.mjs";


// ici on declare la suite de la route donc pour exemple la route /users ici on fait ce qu'il  y  a apres donc /users/login par exemple 
// ont declare la route principal dans le app.mjs  


const router = express.Router();

router.post("/create", register)
router.post("/login", login)

export default router