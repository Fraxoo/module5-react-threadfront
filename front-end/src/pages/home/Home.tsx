import FeedComponent from "../../components/FeedComponent"
import type { Post } from "../../types/PostType"
import TitleComponent from "../../components/TitleComponent"
import { useEffect, useState } from "react"
import "./home.css"



export default function Home() {

    const [posts, setPosts] = useState<Post[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        setErrors({})
        //add loading 

        async function loadPosts() {
            try {
                const res = await fetch(`http://localhost:8000/posts/all/${offset}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                })
                const data = await res.json();
                if (!res.ok) {
                    setErrors(data.errors)
                    return
                }
                setPosts(data);
            } catch (err) {
                console.error(err);
                return
            }
        }
        loadPosts();
    }, [offset])

    return (
        <main>
            <div className="home">
                <TitleComponent title="Feed" />
                <FeedComponent posts={posts} />
                {errors.global && <p className="error-message">{errors.global}</p>}
            </div>
        </main>
    )
}