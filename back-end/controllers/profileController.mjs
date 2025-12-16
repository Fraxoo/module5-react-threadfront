import { User, Post, Comment } from "../models/index.mjs";


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

export async function getPostByUserId(req, res) {
    try {
        const userId = req.params.userId;

        // Récupérer le post avec commentaires et users
        const postData = await Post.findByPk(userId, {
            include: [
                {
                    model: Comment,
                    include: [{ model: User }],
                },
                {
                    model: User, // auteur du post
                },
            ],
        });

        if (!postData) {
            return res.status(404).json({ error: "Post introuvable" });
        }

        // Ajouter le nombre total de commentaires
        const postsCount = await Post.count({
            where: { user_id: userId },
        });

        // Convertir en JSON et ajouter le champ commentsCount
        const postJson = postData.toJSON();
        postJson.postsCount = postsCount;

        res.json(postJson);
    } catch (err) {
        return catchError(res, err);
    }
}
