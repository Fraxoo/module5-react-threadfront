import { useState } from "react";
import type { NewCommentType } from "../types/NewCommentType";
import { useAuth } from "../context/AuthContext";


export default function NewCommentComponent({ postId }: NewCommentType) {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const { user } = useAuth();
    const date = new Date();
    const datefr = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",   // ← mois en toutes lettres
        year: "2-digit", // ← année sur 2 chiffres
    });
    const hourTime = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!content.trim()) {
            setError("Ajoutez un commentaire.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/comments/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ postId, content }),
            });
            //  このコメントを残すことで、フェッチをして何が出てくるのかが理解できる。毎回このようにここに残すことで絵ーが起きたときにな二が原因なのか特定しやすい

            const data = await res.json()

            console.log(data);


            if (!res.ok) {
                throw new Error("Erreur lors de l'envoi");
            }

            setContent("");
            setError("");

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Une erreur inconnue est survenue");
            }
        }
    };

    return (
        <div className="new-comment">
            <h2 className="comment-username"> {user ? user.username : "Invité"}</h2>

            <form className="formcomment" onSubmit={handleSubmit}>
                <textarea className="text-comment"

                    name="content"
                    placeholder="Tapez votre commentaire ici !"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <p className="date">
                    {hourTime}:{minutes} - {datefr}
                </p>
                <button className="comment-button" type="submit">Envoyer</button>
            </form>

        </div>
    );
}
