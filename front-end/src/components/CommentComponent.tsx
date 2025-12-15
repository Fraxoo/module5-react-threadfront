import type { CommentType } from "../types/CommentType"


export default function CommentComponent({ comment }: { comment: CommentType }) {



    return (
        <div className="comment">
            <p>{comment.User.username}</p>
            <p>{comment.content}</p>
            <p>{comment.createdAt}</p>
        </div>
    )
}