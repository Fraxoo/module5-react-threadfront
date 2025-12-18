import { Link } from "react-router";
import type { Post } from "../types/PostType"


export default function PostComponent({ post, isReplies }: { post: Post, isReplies: boolean }) {

    console.log(post);

    return (
        <div className={isReplies ? "comment-card" : "post-card"} >
            <Link to={`/profil/${post.User.id}`}>
                <h3>@{post.User.username}</h3>
            </Link>
            <Link to={`/post/${post.id}`} >
                <p className="content">{post.content}</p>
            </Link>
            <p>15:25 - 13 aout</p>
        </div>
    )
}


