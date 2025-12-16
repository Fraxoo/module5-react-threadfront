import type { PostType } from "../types/PostType"

type Props = {
    post: PostType
}
export default function ProfilComponent({ post }: Props) {

    return (
        <div className="card-profile">

            <h2>{post.User.username}</h2>
            <div className="newest-post">
                <p >Dernier post le{post.createdAt}</p>
                <p>{post.content}</p>

            </div>

        </div>
    )
}