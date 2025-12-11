import { useEffect, useState } from "react";
import FeedComponent from "../../components/FeedComponent";
import "./home.css"



export default function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {

        fetch("http://localhost:8000/post/all"
    )
            .then((res) => res.json())
            .then((data) => setPosts(data))

    }, [])
     console.log(posts);

    return (
        <div>
            <FeedComponent
                allPosts={posts}
            />
        </div>

    )
}