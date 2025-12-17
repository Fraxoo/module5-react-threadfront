import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Post, User } from "../models/index.mjs";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { sequelize } from "../config/database.mjs";
// Ici, on fait tout ce qui est vérification, etc. des routes

dotenv.config();

const JWT_SECRET = process.env.PRIVATE_JWT_KEY;

const sendErrors = (res, errors, status = 400) => {
    return res.status(status).json({ errors });
};

function catchError(res, err) {
    if (err.name === "SequelizeValidationError") {
        const formattedErrors = {};
        err.errors.forEach((e) => {
            formattedErrors[e.path] = e.message;
        });
        return sendErrors(res, formattedErrors, 400);
    }

    return sendErrors(res, { global: err.message }, 500);
}

export async function register(req, res) {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            return sendErrors(res, { global: "Tous les champs sont obligatoires." }, 400);
        }

        const existingUsername = await User.findOne({ where: { username } });

        if (existingUsername) {
            return sendErrors(res, { username: "Pseudo déjà utilisé." }, 409);
        }

        const existingEmail = await User.findOne({ where: { email } });

        if (existingEmail) {
            return sendErrors(res, { email: "Email déjà utilisé." }, 409);
        }

        if (password !== confirmPassword) {
            return sendErrors(res, { password: "Les mots de passe ne correspondent pas." }, 400);
        }

        const hashed = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashed,
        });

        return res.status(201).json({ message: "Inscription réussie !" });
    } catch (err) {
        return catchError(res, err);
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendErrors(res, { global: "Tous les champs sont obligatoires." }, 400);
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return sendErrors(res, { global: "Email ou mot de passe incorrect." }, 401);
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return sendErrors(res, { global: "Email ou mot de passe incorrect." }, 401);
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        return res.json(user);
    } catch (err) {
        return catchError(res, err);
    }
}

export async function logout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    return res.json({ message: "Déconnecté" });
}

export async function getProfil(req, res) {
    try {
        const id = Number(req.params.id);
        const offset = Number(req.params.offset) || 0;
        const limit = 10;

        if (!id) {
            return sendErrors(res, { global: "Paramètre manquant." }, 400);
        }

        const user = await User.findByPk(id);
        if (!user) {
            return sendErrors(res, { global: "Utilisateur introuvable." }, 404);
        }

        const lastPost = await Post.findOne({
            where: { user_id: id, parent_id: null },
            order: [["createdAt", "DESC"]],
        });

        const posts = await Post.findAll({
            where: {
                user_id: id,
                parent_id: null,
                ...(offset === 0 && lastPost ? { id: { [Op.ne]: lastPost.id } } : {}),
            },
            include: [{ model: User }],
            order: [["createdAt", "DESC"]],
            limit,
            offset
        });

        const totalPosts = await Post.count({
            where: {
                parent_id: null,
                user_id: id
            }
        });


        return res.status(200).json({ user, lastPost, posts,totalPosts });
    } catch (err) {
        return catchError(res, err);
    }
}
