import PostComponent from "./PostComponent"
import type { Post } from "../types/PostType"
import { useState } from "react"
import { useParams } from "react-router";
import { useAuth } from "../context/AuthContext";



export default function FeedComponent({ posts, isReplies }: { posts: Post[], isReplies: boolean }) {

    const { user } = useAuth();
    const param = useParams();
    const post_id = param.id;

    const [formData, setFormData] = useState({
        content: "",
    });



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:8000/posts/add`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, post_id })
            })

            const data = await res.json();

            if (!res.ok) {
                console.log(data);
                return
            }

            console.log("post creer");

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="feed">
            {isReplies ? (
                <div className="comment-card">
                    <form onSubmit={handleSubmit}>
                        <p className="bold">@{user?.username}</p>
                        <input className="bold" onChange={handleChange} name="content" placeholder="Taper votre commentaire ici ..." />
                        <p>13:25 - 13 aout 25</p>
                    </form>
                </div>
            ) : "salut"}
            {posts.map((post) => (
                <PostComponent isReplies={isReplies} post={post} />
            )
            )}
        </div>
    )
}