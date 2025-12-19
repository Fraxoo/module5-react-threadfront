import type { CommentType } from "../types/CommentType"


export default function CommentComponent({ comment }: { comment: CommentType }) {
    const date = new Date();
    const datefr = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",   // ← mois en toutes lettres
        year: "2-digit", // ← année sur 2 chiffres
    });
    const hourTime = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");


    return (
        <div className="comment">
            <p>{comment.User.username}</p>
            <p>{comment.content}</p>
            <p className="date">
                {hourTime}:{minutes} - {datefr}
            </p>
        </div>
    )
}