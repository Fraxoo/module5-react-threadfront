import dotenv from "dotenv"
import { User } from "../models/UserModel.mjs";
import jwt from "jsonwebtoken";




dotenv.config();

export function isLoggedInJWT() {
    return async (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        try {
            const decoded = jwt.verify(token, process.env.PRIVATE_JWT_KEY);
            req.userId = decoded.userId;

            req.user = await User.findByPk(req.userId)
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized test" })
            };

            next();
        } catch (err) {
            return res.status(401).json({ message: `Unauthorized: Invalid token` })
        }
    }
}