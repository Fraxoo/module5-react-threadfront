import { Post, User } from "../models/index.mjs";
import { sequelize } from "../config/database.mjs";

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
        const offset = Number(req.params.offset) || 0;

        const posts = await Post.findAll({
            where: { parent_id: null },
            include: [{ model: User }],
            order: [["createdAt", "DESC"]],
            limit: 10,
            offset,
        });

        if (posts.length === 0) {
            return sendErrors(res, { global: "Aucun post pour le moment." }, 400);
        }

        return res.status(200).json(posts);
    } catch (err) {
        return catchError(res, err);
    }
}

export async function createPost(req, res) {
    try {
        const userId = req.user.id;
        const { content, parent_id } = req.body;

        if (!content || content.trim() === "") {
            return sendErrors(res, { content: "Contenu obligatoire." }, 400);
        }

        await Post.create({
            user_id: userId,
            content: content.trim(),
            parent_id: parent_id || null,
        });

        return res.status(200).json({ message: "Post créé avec succès !" });
    } catch (err) {
        return catchError(res, err);
    }
}

export async function deletePost(req, res) {
    try {
        const postId = Number(req.params.id);

        if (!postId) {
            return sendErrors(res, { global: "Aucun id." }, 400);
        }

        const post = await Post.findByPk(postId);

        if (!post) {
            return sendErrors(res, { global: "Post introuvable." }, 404);
        }

        await post.destroy();

        return res.status(200).json({ message: "Post supprimé avec succès." });
    } catch (err) {
        return catchError(res, err);
    }
}

export async function updatePost(req, res) {
    try {
        const { content } = req.body;
        const postId = Number(req.params.id);

        if (!postId) {
            return sendErrors(res, { global: "Aucun id." }, 400);
        }

        if (!content || content.trim() === "") {
            return sendErrors(res, { content: "Contenu requis." }, 400);
        }

        const post = await Post.findByPk(postId);

        if (!post) {
            return sendErrors(res, { global: "Post introuvable." }, 404);
        }

        await post.update({ content: content.trim() });

        return res.status(200).json({ message: "Post mis à jour avec succès." });
    } catch (err) {
        return catchError(res, err);
    }
}

export async function getPostWithRepliesOffset(req, res) {
    try {
        const postId = Number(req.params.id);
        const offset = Number(req.params.offset) || 0;

        if (!postId) {
            return sendErrors(res, { global: "Aucun id." }, 400);
        }

        const post = await Post.findByPk(postId, {
            include: [{ model: User }],
        });

        if (!post) {
            return sendErrors(res, { global: "Post introuvable." }, 404);
        }

        const comments_count = await Post.count({
            where: { parent_id: postId },
        });

        const replies = await Post.findAll({
            where: { parent_id: postId },
            include: [{ model: User }],
            order: [["createdAt", "DESC"]],
            limit: 10,
            offset,
        });

        return res.status(200).json({
            post,
            comments_count,
            replies,
        });
    } catch (err) {
        return catchError(res, err);
    }
}
