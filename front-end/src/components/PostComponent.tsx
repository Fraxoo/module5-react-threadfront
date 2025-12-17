import type { PostType } from "../types/PostType"

type Props = {
  post: PostType;
  onClick?: () => void;
};

export default function PostComponent({ post, onClick }: Props) {

  return (
    <div className="posts"
      onClick={onClick}
    >
      <h3>{post.User.username}</h3>
      <p>{post.content}</p>
      <p>{post.createdAt}</p>
    </div>
  );
}
