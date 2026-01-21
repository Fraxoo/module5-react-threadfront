import { Comment } from "../models/index.mjs";


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

export async function createComment(req, res) {
    try {

        const { content, postId } = req.body;
        const userId = req.user.id;

        if (!postId) {
            return sendErrors(res, [
                { field: "postId", message: "postId requis" }
            ], 400);
        }

        if (!content || content.trim() === "") {
            return sendErrors(res, [{ field: "content", message: "Contenu requis" }], 400);
        }

        const newComment = await Comment.create({
            user_id: userId,
            content,
            post_id: postId
        })

        return res.status(200).json("Commentaire ajouté!")
    } catch (err) {
        return catchError(res, err)
    }
}

export async function deleteComment(req, res) {
    try {
        const { commentId } = req.body;
        const userId = req.user.id;

        if (!commentId) {
            return sendErrors(res, [{ field: "global", message: "Erreur veuillez réessayer " }], 400);
        }

        if (isNaN(commentId)) {
            return sendErrors(res, [
                { field: "global", message: "ID invalide" }
            ], 400);
        }

        const deletedComment = await Comment.destroy({ where: { id: commentId, user_id: userId } });

        if (deletedCount === 0) {
            return sendErrors(res, [
                { field: "global", message: "Commentaire introuvable" }
            ], 404);
        }


        return res.status(200).json({ message: "Commentaire supprimé avec succés" })
    } catch (err) {
        return catchError(res, err)
    }

}
export async function getCommentsByPostId(req, res) {
    try {

        const commentsData = await Comment.findAll({
            where: { post_id },
            include: [
                { model: User, attributes: ["id", "username"] },
            ]
        });

        if (!commentsData || commentsData.length === 0) {
            return res.status(200).json([]);
        }
        return res.status(200).json(commentsData);

    } catch (err) {
        return catchError(res, err)
    }
}