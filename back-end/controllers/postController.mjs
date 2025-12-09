import { User, Post } from "../models/index.mjs";

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


export async function getAllPosts(req, res) {
    try {
        const postsData = await Post.findAll({

        })
        if (!postsData || postsData.length === 0) {
            return res.status(200).json([]);
        }
    } catch (err) {
        return catchError(res, err);
    }
}