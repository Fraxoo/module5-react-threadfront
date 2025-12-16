import type { PostType } from "../types/PostType"

type Props={
    post:PostType
}
export default function ProfilComponent({post}:Props) {

    return (
        <div>
            <h1>Profile</h1>
            <h2>{post.User.username}</h2>
            <p>Dernier post le{post.createdAt}</p>
            <p>{post.content}</p>

        </div>
    )
}