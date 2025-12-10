import type { PostProps } from "../types/PostType"

export default function PostComponent({ username, content, date }: PostProps) {


  return (


    <div className="post">
      <h3>{username}</h3>
      <p>{content}</p>
      <p>{date}</p>
    </div>
  )
}