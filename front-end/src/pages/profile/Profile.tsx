import { useEffect, useState } from "react";
import FeedComponent from "../../components/FeedComponent";
import TitleComponent from "../../components/TitleComponent";
import { useParams } from "react-router";
import type { Post } from "../../types/PostType";
import type { UserType } from "../../types/UserType";
import "./profile.css"
import postAsset from "../../assets/posts.png"
import NavBarComponent from "../../components/NavBarComponent";




export default function Profile() {

    let params = useParams();
    const id = params.id

    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<UserType>()
    const [offset, setOffset] = useState(0);
    const [lastPost, setLastPost] = useState<Post>()
    const [totalPosts, setTotalPosts] = useState(0)


    useEffect(() => {

        async function getProfil() {
            try {
                const res = await fetch(`http://localhost:8000/users/profil/${id}/${offset}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                });

                const data = await res.json();

                if (!res.ok) {
                    console.log(data);

                    return
                }
                console.log(data);

                setLastPost(data.lastPost)
                setPosts(data.posts)
                setUser(data.user)
                setTotalPosts(data.totalPosts)
            } catch (err) {
                console.error(err)
                return
            }
        }

        getProfil();
    }, [])


    return (

        <main>
            <div className="profil">
                <TitleComponent title="Profile" />
                <div className="profil-content">
                    <h2>@{user?.username}</h2>
                    <div className="post-card">
                        <div className="profil-last-post-info">
                            <p className="bold">Dernier post le </p>
                            <p className="profil-hour">15:25 - 13 aout 25</p>
                        </div>
                        <p>{lastPost?.content}</p>
                    </div>
                    <div className="profil-feed">
                        <div className="profil-content-count">
                            <p className="white">{totalPosts}</p>
                            <img src={postAsset} alt="logo" />
                        </div>
                        <FeedComponent posts={posts} />
                    </div>
                </div>
            </div>
        </main>

    )
}