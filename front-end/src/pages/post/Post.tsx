import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { PostType } from "../../types/PostType";

export default function Post() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:8000/post/${postId}`);
        if (!res.ok) throw new Error(`Post ${postId} introuvable`);
        const data = await res.json();
        setPost(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erreur réseau");
      }
    };

    fetchPost();
  }, [postId]);

  if (error) return <div>{error}</div>;
  if (!post) return <div>Chargement...</div>;

  return (
    <div>
      <h1>{post.User.username}</h1>
      <p>{post.content}</p>
    </div>
  );
}
