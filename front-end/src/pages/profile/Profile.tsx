
import { useEffect, useState } from "react";
import type { PostType } from "../../types/PostType";
import ProfilComponent from "../../components/ProfilComponent";
import PostComponent from "../../components/PostComponent";
import "./profile.css";
import { useNavigate } from "react-router";
import FeedComponent from "../../components/FeedComponent";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();
    const {logout} = useAuth()

    useEffect(() => {
        const fetchPost = async () => {

            try {
                const res = await fetch("http://localhost:8000/profile/me", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                })



                if (!res.ok) {
                    throw new Error("Erreur serveur");
                }

                const data = await res.json();
                console.log("posts:", data);
                setPosts(Array.isArray(data) ? data : []);

            } catch (err) {
                console.error("fetch error", err);

                if (err instanceof Error) {
                    setErrors(err.message);
                } else {
                    setErrors("Erreur réseau");
                }

            }
        };
        fetchPost();
    }, []);
    const sortedPosts = posts
        .slice()
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );

    const latestPost = sortedPosts[0];
    const otherPosts = sortedPosts.slice(1);
    const handlePostClick = (id: number) => {
        navigate(`/post/${id}`);
    };


    return (
        <div className="profile-page">
            <h1 className="profile-title">|Profile</h1>
            <button className="logout"onClick={logout} > 
                se déconnecter</button>

            {latestPost && <ProfilComponent
                post={latestPost} />}
            <FeedComponent
                items={otherPosts || []}
                Component={({ item }) => (
                    <PostComponent post={item} onClick={() => handlePostClick(item.id)} />

                )}
            />

        </div>
    )
}