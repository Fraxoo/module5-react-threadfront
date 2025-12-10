import { useEffect, useState } from "react";
import FeedComponent from "../../components/FeedComponent";
import "./home.css"



export default function Home() {
    const [posts, setPosts] = useState([])
useEffect(()=>{
    fetch("http://localhost:5173/post/get/all")
        .then((res) => res.json())
        .then((data) => setPosts(data))
     
},[])

    return (
        <div>
            <FeedComponent 
            allPosts = {posts}
            />
        </div>

    )
}