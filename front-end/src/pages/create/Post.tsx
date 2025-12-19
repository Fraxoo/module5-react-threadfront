import { useState } from "react";
import TitleComponent from "../../components/TitleComponent";
import "./post.css"
import { useNavigate } from "react-router";
import { formatNow } from "../../components/dateDisplay";


export default function CreatePost() {


    const navigate = useNavigate();
    const date = formatNow();


    const [success, setSuccess] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        content: "",
    });
    const [delay, setDelay] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setSuccess("");
        setErrors({});

        if (!delay) {

            try {
                const res = await fetch(`http://localhost:8000/posts/add`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(formData)
                })

                const data = await res.json();
                console.log(data);


                if (!res.ok) {
                    setErrors(data.errors)
                    return
                }
                setDelay(true)
                setSuccess("Post crée avec succés!")
                setTimeout(() => {
                    navigate("/home");
                    setDelay(false)
                }, 1000)
            } catch (err) {
                setDelay(true)
                setTimeout(() => {
                    setDelay(false);
                })
                console.error(err);
            }
        }


    }


    return (
        <main>
            <div className="create-post-page">
                <TitleComponent title="New Post" />
                <form onSubmit={handleSubmit}>
                    <div className="create-post">
                        <textarea maxLength={400} minLength={1} onChange={handleChange} name="content" placeholder="Tapez votre post ici" >

                        </textarea>
                        <div className="create-post-info">
                            <p>{date}</p>
                        </div>
                    </div>
                 
                        <button>Poster !</button>
                    
                </form>
                {errors.content && <p className="error-message">{errors.content}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </main>
    )
}