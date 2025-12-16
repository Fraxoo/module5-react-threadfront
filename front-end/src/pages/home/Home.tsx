import NavBarComponent from "../../components/navbar/NavBarComponent"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { PostType } from "../../types/PostType";
import FeedComponent from "../../components/FeedComponent";
import PostComponent from "../../components/PostComponent";
import "./home.css"


export default function Home() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("http://localhost:8000/post/all");

                if (!res.ok) {
                    throw new Error("Erreur serveur");
                }

                const data = await res.json();

                setPosts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Fetch error:", err);
                setErrors(err || "Erreur réseau");
            }
        };

        fetchPosts();
    }, []);
    const handlePostClick = (id: number) => {
        navigate(`/post/${id}`);
    };


    return (
        <div>
             <h1>Feed</h1>
            <FeedComponent
                items={posts || []}
                Component={({ item }) => (
                    <PostComponent post={item} onClick={() => handlePostClick(item.id)} />
                )}
            />
            <NavBarComponent/>
        </div>

    )
}