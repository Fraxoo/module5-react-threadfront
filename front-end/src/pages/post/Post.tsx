import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { PostType } from "../../types/PostType";
import type { CommentType } from "../../types/CommentType";

import FeedComponent from "../../components/FeedComponent";
import PostComponent from "../../components/PostComponent";
import NewCommentComponent from "../../components/NewCommentComponent";
import CommentComponent from "../../components/CommentComponent";
import CommentCountComponent from "../../components/CommentCountComponent";


import "./post.css"

export default function Post() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [error, setError] = useState<string>("");


  if (!postId) return;

  const fetchPost = async () => {
    try {
      const res = await fetch(`http://localhost:8000/post/${postId}`, {
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
    <div className="post-page">
      <h1 className="posttitle">|Post</h1>
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
     
    </div>
  );
}
