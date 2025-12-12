import { useEffect, useState } from "react";
import FeedComponent from "../../components/FeedComponent";
import PostComponent from "../../components/PostComponent";
import "./home.css"



export default function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {

        fetch("http://localhost:8000/post/all"
        )
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error("Fetch error:", err));

    }, [])



    return (
        <div>
            <FeedComponent
                items={posts||[]}
                Component={PostComponent}
            />
        </div>

    )
}