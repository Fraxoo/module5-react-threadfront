import { Link } from "react-router";
import type { Post } from "../types/PostType"
import DateLabel from "./dateDisplay";


export default function PostComponent({ post, isReplies }: { post: Post, isReplies: boolean }) {


    return (
        <div className={isReplies ? "comment-card" : "post-card"} >
            <div className="post-card-content">
                <Link to={`/profil/${post.User.id}`}>
                    <h3>@{post.User.username}</h3>
                </Link>
                {isReplies
                    ?
                    <p className="content">{post.content}</p>
                    :
                    <Link to={`/post/${post.id}`} >
                        <p className="content">{post.content}</p>
                    </Link>}
            </div>
            <p className={isReplies ? "comment-date" : "post-date"}><DateLabel iso={post.createdAt} /></p>
        </div>
    )
}


