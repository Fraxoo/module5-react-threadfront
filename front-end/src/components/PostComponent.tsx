import type { Post } from "../types/PostType"


export default function PostComponent({ post }: { post: Post }) {

    console.log(post);

    return (
        <div className="post-card">
            <h2>@{post.User.username}</h2>
            <p className="content">{post.content}</p>
            <p>15:25 - 13 aout</p>
        </div>
    )
}