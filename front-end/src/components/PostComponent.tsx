import type { Post } from "../types/PostType"


export default function PostComponent({ post }: { post: Post }) {


    return (
        <div className="post-card">
            {post.content}
        </div>
    )
}