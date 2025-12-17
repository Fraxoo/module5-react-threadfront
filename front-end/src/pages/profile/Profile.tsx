
import { useEffect, useState } from "react"
import NavBarComponent from "../../components/navbar/NavBarComponent"
import type { PostType } from "../../types/PostType"
import ProfilComponent from "../../components/ProfilComponent";
import PostComponent from "../../components/PostComponent";
import "./profile.css"
import { useNavigate } from "react-router";
import FeedComponent from "../../components/FeedComponent";

export default function Profile() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {

            try {
                const res = await fetch(`hhttp://localhost:8000/post/${user_id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                })

                if (!res.ok) {
                    throw new Error("Erreur serveur");
                }
                const data = await res.json();
                setPosts(Array.isArray(data) ? data : []);
                
            } catch (err) {
                console.error("fetch error", err);
                setErrors(err || "Erreur réseau");
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
        <div>
            <h1>Profile</h1>
            {latestPost && <ProfilComponent
                post={latestPost} />}
            <FeedComponent
                items={otherPosts || []}
                Component={({ item }) => (
                    <PostComponent post={item} onClick={() => handlePostClick(item.id)} />

                )}
            />
            <NavBarComponent />
        </div>
    )
}