import { useEffect, useState } from "react"
import FeedComponent from "../../components/FeedComponent"
import type { Post } from "../../types/PostType"
import { useParams } from "react-router"
import TitleComponent from "../../components/TitleComponent"
import "./post.css"


export default function Post() {

    const [post, setPost] = useState<Post>()
    const [replies, setReplies] = useState<Post[]>([]);
    const [errors, setErrors] = useState({})
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(true)
    const [commentsCount, setCommentsCount] = useState(0)

    const param = useParams();
    const id = param.id
    console.log(id);


    useEffect(() => {
        async function getPostWithReplies() {
            try {
                const res = await fetch(`http://localhost:8000/posts/${id}/${offset}`, {
                    method: "GET",
                    credentials: "include"
                })

                const data = await res.json();
                console.log(data);


                if (!res.ok) {
                    setErrors(data)
                    return
                }

                setPost(data.post)
                setReplies(data.replies)
                setCommentsCount(data.comments_count)


            } catch (err) {
                console.error(err);
                return;
            } finally {
                setLoading(false)
            }
        }

        getPostWithReplies();
    }, [])

    return (
        <main>
            <div className="post-page">
                <TitleComponent title="Post" />
                {loading
                    ? "Chargement"
                    : (
                        <div className="post-page-content">
                            <div className="post-card">
                                <h3>@Ryudu57</h3>
                                <p className="content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, dolore. A quasi laudantium unde sapiente, molestias natus vero sunt aspernatur veritatis commodi vitae, saepe omnis blanditiis eveniet libero velit fugit.</p>
                                <p className="post-date">15:25 - 13 aout 25</p>
                            </div>
                            <p className="white bold">{commentsCount}</p>
                            {replies ? (
                                <FeedComponent setPosts={setReplies} posts={replies} isReplies={true} />
                            ) : "Aucun post pour le moment"}
                        </div>
                    )}
            </div>
        </main>

    )
}