import { useState } from "react";
import TitleComponent from "../../components/TitleComponent";
import "./post.css"
import { useNavigate } from "react-router";



export default function CreatePost() {

    const navigate = useNavigate();

    const [success, setSuccess] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        content: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setSuccess("");
        setErrors({});

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

            setSuccess("Post crée avec succés!")
            setInterval(() => {
                navigate("/home");
            }, 1000)
        } catch (err) {
            console.error(err);

        }
    }


    return (
        <main>
            <div className="create-post-page">
                <TitleComponent title="New Post" />
                <div className="create-post">
                    <form onSubmit={handleSubmit}>
                        <textarea maxLength={400} minLength={1} onChange={handleChange} name="content" placeholder="Tapez votre post ici" >

                        </textarea>
                        <div className="create-post-info">
                            <p>15:25 - 13 aout 2025</p>
                            <button>Envoyer</button>
                        </div>
                    </form>
                </div>
                {errors.content && <p className="error-message">{errors.content}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </main>
    )
}