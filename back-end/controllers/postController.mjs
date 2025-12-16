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

export async function getAllData(req, res) {
    try {
        const postsData = await Post.findAll({
            include: [
                {
                    // auteur du post
                    model: User,
                    attributes: ["id", "username"]
                },
                {
                    model: Comment,
                    include: [
                        {
                            // auteur du commentaire
                            model: User,
                            attributes: ["id", "username"]
                        }
                    ]
                }
            ]
        });


        if (!postsData || postsData.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json(postsData);

    } catch (err) {
        return catchError(res, err);
    }
}


export async function getPostById(req, res) {
  try {
    const postId = req.params.postId;

    // Récupérer le post avec commentaires et users
    const postData = await Post.findByPk(postId, {
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
    const commentsCount = await Comment.count({
      where: { post_id: postId },
    });

    // Convertir en JSON et ajouter le champ commentsCount
    const postJson = postData.toJSON();
    postJson.commentsCount = commentsCount;

    res.json(postJson);
  } catch (err) {
    return catchError(res, err);
  }
}
