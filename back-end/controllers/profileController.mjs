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

export async function getPostsByUserId(req, res) {
  try {
    const userId = req.params.userId;

    // Récupérer tous les posts de l'utilisateur
    const posts = await Post.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Comment,
          include: [{ model: User }],
        },
        {
          model: User, // auteur du post
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "Aucun post trouvé pour cet utilisateur" });
    }

    // Ajouter le nombre de commentaires à chaque post
    const postsWithCounts = posts.map((post) => {
      const postJson = post.toJSON();
      postJson.commentsCount = postJson.Comments ? postJson.Comments.length : 0;
      return postJson;
    });

    res.json(postsWithCounts);
  } catch (err) {
    return catchError(res, err);
  }
}

export async function getPostsByUserLog(req, res) {
  try {
    const userId = req.userId;

    const posts = await Post.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Comment,
          include: [{ model: User }],
        },
        {
          model: User,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "Aucun post trouvé pour cet utilisateur" });
    }

    const postsWithCounts = posts.map((post) => {
      const postJson = post.toJSON();
      postJson.commentsCount = postJson.Comments ? postJson.Comments.length : 0;
      return postJson;
    });

    res.json(postsWithCounts);
  } catch (err) {
    return catchError(res, err);
  }
}