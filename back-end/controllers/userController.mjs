
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { sequelize } from "../config/database.mjs";
import { User } from "../models/index.mjs"
import bcrypt, { hash } from "bcrypt";


// ici on fait tout ce qui est verification etc des routes 


dotenv.config();

const JWT_SECRET = process.env.PRIVATE_JWT_KEY;



const sendErrors = (res, errors, status = 400) => {
    return res.status(status).json({ errors });
};

function catchError(res, err) {
    if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message,
        }));
        return sendErrors(res, errors, 400);
    }
    return sendErrors(res, [{ field: "global", message: err.message }], 500);
}



export async function register(req, res) {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            return sendErrors(res, [{ field: "global", message: "Tous les champs sont obligatoires." }], 400);
        }

        const existingUsername = await User.findOne({ where: { username } });

        if (existingUsername) {
            return sendErrors(res, [{ field: "username", message: "Pseudo déjà utilisé." }], 409);
        }

        const existingEmail = await User.findOne({ where: { email } });

        if (existingEmail) {
            return sendErrors(res, [{ field: "email", message: "Email déjà utilisé." }], 409);
        }

        if (password !== confirmPassword) {
            return sendErrors(res, [{ field: "password", message: "Les mots de passe ne correspondent pas." }], 400)
        }

        const hashed = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashed,
        })

        return res.status(201).json("Inscription réussi!");

    } catch (err) {
        return catchError(res, err)
    }

}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendErrors(res, [{ field: "global", message: "Tous les champs sont obligatoires." }], 400);
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return sendErrors(res, [{ field: "global", message: "Email ou mot de passe incorrect." }], 401);
        }

        console.log(user);


        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return sendErrors(res, [{ field: "global", message: "Email ou mot de passe incorrect." }], 401);
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        res.json(user)
    } catch (err) {
        return catchError(res, err)
    }
}

export async function logout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    return res.json({ message: "Déconnecté" })
}