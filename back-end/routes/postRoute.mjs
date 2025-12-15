import express from "express"
import { getAllData ,getPostById } from "../controllers/postController.mjs"


const router = express.Router();

router.get("/all", getAllData)
router.get("/:postId", getPostById)
//  MS create post router
 router.post("/create/post")


export default router



///////


//mes codes je réfléchis MS

        // app.post("/posts", isLoggedInJWT(userModel), async (req, res) => {
        //     console.log(req.body);
        //     const newPostData = req.body;
        //     try {
        //         // +
        //         const newPost = await Post.create({
        //             // title: newPostData.title,
        //             // content: newPostData.content,
        //             // userId: newPostData.userid, // ça marche !!
        //             title: req.body.title,
        //             content: req.body.content,
        //             UserId: req.userId,
        //             // PostId:req.postId
        //         });

        //         res.status(201).json(newPost)


        //     } catch (error) {
        //         console.log(error);
        //         res.status(500).json({ error: "Erreur lors de la création du post" });
        //     }
        // });// ça marche
        
        
        // //mon autre code je réfléchis
        
        //     // Création d'un post
        // const newPost = await Post.create({
        //     title: "acheter chips",
        //     content: "pour anniversaire Amaury",
        //     datetime: new Date(),
        //     UserId: userById.id
        // });
