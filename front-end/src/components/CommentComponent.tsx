import type { CommentProps } from "../types/CommentType"
export default function CommentComponent({username,content,createdAt}:CommentProps) {



    return (
        <div className="comment">
            <p>{username}</p>
            <p>{content}</p>
            <p>{createdAt}</p>
        </div>
    )
}