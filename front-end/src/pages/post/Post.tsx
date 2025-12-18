import { useEffect, useState } from "react"
import FeedComponent from "../../components/FeedComponent"
import type { Post } from "../../types/PostType"
import { useParams } from "react-router"
import TitleComponent from "../../components/TitleComponent"
import "./post.css"


export default function Post() {

    const [post, setPost] = useState<Post>()
    const [replies, setReplies] = useState<Post[]>([])
    const [errors, setErrors] = useState<{ [key: string]: string }>()
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(true)
    const [commentsCount, setCommentsCount] = useState(0)
    const [hasMore, setHasMore] = useState(false)

    const param = useParams();
    const id = param.id

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

                setHasMore(data.hasMore)
                setPost(data.post)
                setReplies((prev) => [...prev, ...data.replies])
                setCommentsCount(data.comments_count)


            } catch (err) {
                setErrors({ global: "Erreur veuillez réessayer" })
                console.error(err);
                return;
            } finally {
                setLoading(false)
            }
        }

        getPostWithReplies();
    }, [offset])


    return (
        <main>
            <div className="post-page">
                <TitleComponent title="Post" />
                {loading
                    ? "Chargement"
                    : (errors ? <p className="error-message">{errors.global}</p> : (
                        <div className="post-page-content">
                            <div className="post-card">
                                <h3>@{post?.User.username}</h3>
                                <p className="content">{post?.content}</p>
                                <p className="post-date">15:25 - 13 aout 25</p>
                            </div>
                            <p className="white bold">{commentsCount}</p>
                            {replies ? (
                                <FeedComponent hasMore={hasMore} setOffset={setOffset} setPosts={setReplies} posts={replies} isReplies={true} />
                            ) : "Aucun post pour le moment"}
                        </div>
                    )
                    )}
            </div>

        </main>

    )
}