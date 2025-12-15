import type { CommentCountType } from "../types/CommentCountType"

export default function CommentCountComponent({count}:CommentCountType) {

  return (
    <div>
        {count} 💬
    </div>
  )
}