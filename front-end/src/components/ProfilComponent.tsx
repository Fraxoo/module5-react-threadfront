import type { PostType } from "../types/PostType"

type Props = {
    post: PostType
}
export default function ProfilComponent({ post }: Props) {
    const date = new Date();
    const datefr = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",   // ← mois en toutes lettres
        year: "2-digit", // ← année sur 2 chiffres
    });
    const hourTime = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return (
        <div className="card-profile">

            <h2 className="profile-name">@{post.User.username}</h2>
            <div className="newest-post">

                <p className="date">Dernier post le {hourTime}:{minutes} - {datefr}</p>

                <p>{post.content}</p>

            </div>

        </div>
    )
}