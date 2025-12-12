import type { PostType } from "../types/PostType"

export default function PostComponent({ item }: { item: PostType }) {

  return (
    <div className="post">
      <h3>{item.User.username}</h3>
      <p>{item.content}</p>
      <p>{item.createdAt}</p>
    </div>
  );
}
