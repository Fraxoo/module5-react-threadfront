import NavBarComponent from "../../components/navbar/NavBarComponent"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { PostType } from "../../types/PostType";
import type { CommentType } from "../../types/CommentType";

import PostComponent from "../../components/PostComponent";
import FeedComponent from "../../components/FeedComponent";
import CommentComponent from "../../components/CommentComponent";
import CommentCountComponent from "../../components/CommentCountComponent";
import NewCommentComponent from "../../components/NewCommentComponent";
import "./post.css"
export default function Post() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [error, setError] = useState<string>("");

  if (!postId) return;

  const fetchPost = async () => {
    try {
      const res = await fetch("`http://localhost:8000/post/${postId}`", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })
      if (!res.ok) throw new Error(`Post ${postId} introuvable`);
      const data = await res.json();
      setPost(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur réseau");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);


  if (error) return <div>{error}</div>;
  if (!post) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Post</h1>
      {/* Post principal */}
      <PostComponent post={post} />
      <NewCommentComponent
        postId={Number(postId)}
      />
      <CommentCountComponent
        count={post.commentsCount} />

      <FeedComponent<CommentType>
        items={post.Comments}
        Component={({ item }) => <CommentComponent comment={item} />}
      />
      <NavBarComponent />
    </div>
  );
}
