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
const post1 = await Post.create({
    user_id: 1,
    content: "Ici on fait un Post Test yo yo yo wesh wesh"

})
const post2 = await Post.create({
    user_id: 1,
    content: "ci on fait un Post Test yo yo yo wesh wesh c'est le terter"
})
const post3 = await Post.create({
    user_id: 1,
    content: "Qui veux se battre avec Meiko wesh"
})

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

export async function getPostById(req, res) {
    try {
        const postId = req.params.id
        const postData = await Post.findByPk(postId, {
            include: [
                { model: Comment },
                { model: User }
            ]
        });

        const username = postData.User.username

        res.json(postData)
    } catch (err) {
        return catchError(res, err);
    }
}