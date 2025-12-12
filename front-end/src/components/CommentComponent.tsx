import type { CommentType } from "../types/CommentType"


export default function CommentComponent({ item }: { item: CommentType }) {



    return (
        <div className="comment">
            <p>{item.User.username}</p>
            <p>{item.content}</p>
            <p>{item.createdAt}</p>
        </div>
    )
}