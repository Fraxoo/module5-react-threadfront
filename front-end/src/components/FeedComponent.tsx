import PostComponent from "./PostComponent"
import type { Post } from "../types/PostType"


export default function FeedComponent({ posts }: { posts: Post[] }) {


    return (
        <div className="feed">
            {posts.map((post) => (
                <PostComponent post={post} />
            )
            )}
        </div>
    )
}