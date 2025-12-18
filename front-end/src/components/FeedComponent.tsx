import PostComponent from "./PostComponent"
import type { Post } from "../types/PostType"
import { useState } from "react"
import { useParams } from "react-router";
import { useAuth } from "../context/AuthContext";



export default function FeedComponent({ posts, isReplies, setPosts }: { posts: Post[], isReplies: boolean, setPosts: React.Dispatch<React.SetStateAction<Post[]>> }) {

    const { user } = useAuth();
    const param = useParams();
    const post_id = param.id;

    const [formData, setFormData] = useState({
        content: "",
    });
    const [success, setSuccess] = useState("")



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

            console.log(data);


            setPosts((prev) => [data.post, ...prev]);
            setSuccess("Commentaire ajouté!")
            setFormData({ content: "" });

        } catch (err) {
            console.error(err);
        }
    }

    console.log(posts);


    return (
        <div className="feed">
            {isReplies ? (
                <div className="comment-card">
                    <form onSubmit={handleSubmit}>
                        <p className="bold">@{user?.username}</p>
                        <input className="bold" value={formData.content} onChange={handleChange} name="content" placeholder="Taper votre commentaire ici ..." />
                        <p className="comment-date">13:25 - 13 aout 25</p>
                    </form>
                </div>
            ) : ""}
            {posts.map((post) => (
                <PostComponent isReplies={isReplies} post={post} />
            )
            )}
        </div>
    )
}