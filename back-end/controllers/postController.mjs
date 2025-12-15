import { Post } from "../models/index.mjs"

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

export async function getAllPostWithOffset(req, res) {
    try {

    } catch (err) {
        return catchError(res, err)
    }
}

export async function createPost(req, res) {
    try {

    } catch (err) {
        return catchError(res, err)
    }
}

export async function deletePost(req, res) {
    try {

    } catch (err) {
        return catchError(res, err)
    }
}

export async function updatePost(req, res) {
    try {

    } catch (err) {
        return catchError(res, err)
    }
}

export async function getPostWithRepliesOffset(req, res) {
    try {

    } catch (err) {
        return catchError(res, err)
    }
}