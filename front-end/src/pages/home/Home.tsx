import NavBarComponent from "../../components/navbar/NavBarComponent"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { PostType } from "../../types/PostType";
import FeedComponent from "../../components/FeedComponent";
import PostComponent from "../../components/PostComponent";
import "./home.css"
import { useAuth } from "../../context/AuthContext"


export default function Home() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("http://localhost:8000/post/all", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                })

                const data = await res.json();
                console.log(data);

                if (!res.ok) {
                    throw new Error("Erreur serveur");

                }


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
    
    
    const { user } = useAuth();
    console.log(user);

    return (
        <div className="home-page">
            <h1 className="feed">|Feed</h1>
            <FeedComponent
                items={posts || []}
                Component={({ item }) => (
                    <PostComponent post={item} onClick={() => handlePostClick(item.id)} />
                )}
            />
            <NavBarComponent />
        </div>

    )
}

