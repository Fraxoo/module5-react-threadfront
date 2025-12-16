
import { useEffect, useState } from "react"
import NavBarComponent from "../../components/navbar/NavBarComponent"
import type { PostType } from "../../types/PostType"
import ProfilComponent from "../../components/ProfilComponent";
import PostComponent from "../../components/PostComponent";


export default function Profile() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [errors, setErrors] = useState("");
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch("http://localhost:8000/post/all");

                if (!res.ok) {
                    throw new Error("Erreur serveur");
                }
                const data = await res.json();
                setPosts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("fetch error", err);
                setErrors( err || "Erreur réseau");
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


    return (
        <div>
            {latestPost && <ProfilComponent
                post={latestPost} />}
            {otherPosts.map((post) => (
                <PostComponent key={post.id} post={post} />
            ))}
            <NavBarComponent />
        </div>
    )
}