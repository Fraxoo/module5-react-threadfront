import { useState } from "react";
import type { NewCommentType } from "../types/NewCommentType";


export default function NewCommentComponent({ postId }: NewCommentType) {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

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
                body: JSON.stringify({ postId, content }),
            });

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
        <div>
            <h2>username</h2>

            <form onSubmit={handleSubmit}>
                <textarea className="text-comment"
                    
                    name="content"
                    placeholder="Tapez votre commentaire ici !"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Envoyer</button>
            </form>

            <p>Date</p>
        </div>
    );
}
