import type { CommentsProps } from "../types/CommentsType"
import CommentComponent from "./CommentComponent"

export default function CommentListComponent({allComments}:CommentsProps) {
  return (
    <div>
        <p>comments</p>
        {allComments.map((comment=>
          <CommentComponent
          key={comment.id}
          username={comment.user?.username??"Unknown user"}
          content={comment.content}
          createdAt={comment.createdAt}
          />
        ))}
        
    </div>
  )
}