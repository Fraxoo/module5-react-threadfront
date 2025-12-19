import type { PostType } from "../types/PostType"

type Props = {
  post: PostType;
  onClick?: () => void;
};
const date = new Date();
const datefr = date.toLocaleDateString("fr-FR", {
  day: "2-digit",
  month: "long",   // ← mois en toutes lettres
  year: "2-digit", // ← année sur 2 chiffres
});
const hourTime = date.getHours();
const minutes = date.getMinutes().toString().padStart(2, "0");

export default function PostComponent({ post, onClick }: Props) {

  return (
    <div className="post"
      onClick={onClick}
    >
      <h3>@{post.User.username}</h3>
      <p>{post.content}</p>
      <p className="date">
        {hourTime}:{minutes} - {datefr}
      </p>
    </div>
  );
}
