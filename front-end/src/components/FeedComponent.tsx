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
    const [errors, setErrors] = useState<{ [key: string]: string }>()



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSuccess("")
        setErrors({})

        try {
            const res = await fetch(`http://localhost:8000/posts/add`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, post_id })
            })

            const data = await res.json();


            if (!res.ok) {
                setErrors(data.errors)
                return
            }

            setPosts((prev) => [data.post, ...prev]);
            setSuccess("Commentaire ajouté!")
            setFormData({ content: "" });

        } catch (err) {
            setErrors({ global: "Erreur" })
            console.error(err);
        }
    }


    return (
        <div className="feed">
            {success && <p className="success-message">{success}</p>}
            {errors && <p className="error-message">{errors.content}</p>}
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
                <PostComponent key={post.id} isReplies={isReplies} post={post} />
            )
            )}
        </div>
    )
}