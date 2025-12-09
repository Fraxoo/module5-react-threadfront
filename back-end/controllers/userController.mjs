
import dotenv from "dotenv";
import { sequelize } from "../config/database.mjs";


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



export async function register() {
    try {

    } catch (err) {

    }
}

export async function login() {
    try {

    } catch (err) {

    }
}