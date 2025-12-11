import PostComponent from "./PostComponent";
import type { PostsProps } from "../types/PostsType";

export default function FeedComponent({ allPosts }: PostsProps) {
    return (
        <div>
            <h1>Feed</h1>
            {allPosts.map((post=>
            <PostComponent 
            key={post.id}
            username={post.user?.username ?? "Unknown user"}
            content={post.content}
            createdAt={post.createdAt} 
            />

            )) }
        </div>
    )
}