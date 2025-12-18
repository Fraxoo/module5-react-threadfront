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
        const limit = Number(10);

        const posts = await Post.findAll({
            where: { parent_id: null },
            include: [{ model: User }],
            order: [["createdAt", "DESC"]],
            limit: limit,
            offset,
        });

        const postsCount = await Post.count({
            where: { parent_id: null }
        })

        const hasMore = offset + limit < postsCount;


        if (posts.length === 0) {
            return sendErrors(res, { global: "Aucun post pour le moment." }, 400);
        }

        return res.status(200).json({
            posts,
            hasMore
        });
    } catch (err) {
        return catchError(res, err);
    }
}

export async function createPost(req, res) {
    try {
        const userId = req.user.id;
        const { content, post_id } = req.body;

        if (!content || content.trim() === "") {
            return sendErrors(res, { content: "Contenu obligatoire." }, 400);
        }

        const newPost = await Post.create({
            user_id: userId,
            content: content.trim(),
            parent_id: post_id || null,
        });

        const post = await Post.findByPk(newPost.id, {
            include: [{ model: User }],
        })

        return res.status(200).json({ message: "Post créé avec succès !", post });
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
        const limit = Number(10);

        if (!postId) {
            return sendErrors(res, { global: "Aucun id." }, 400);
        }

        const post = await Post.findByPk(postId, {
            include: [
                {
                    model: User,
                    attributes: { exclude: ["password"] },
                },
            ], //pratique
        });

        if (!post) {
            return sendErrors(res, { global: "Post introuvable." }, 404);
        }

        const comments_count = await Post.count({
            where: { parent_id: postId },
        });

        const replies = await Post.findAll({
            where: { parent_id: postId },
            include: [
                {
                    model: User,
                    attributes: { exclude: ["password"] },
                },
            ], //pratique
            order: [["createdAt", "DESC"]],
            limit: limit,
            offset,
        });

        const hasMore = offset + limit < comments_count;

        return res.status(200).json({
            post,
            comments_count,
            replies,
            hasMore
        });
    } catch (err) {
        return catchError(res, err);
    }
}


export async function createReplies(req, res) {
    const id = req.params.id;

    if (!id) {
        return sendErrors(res, { global: "Aucun parametre" })
    }

    const replie = await Post.create({

    })
}