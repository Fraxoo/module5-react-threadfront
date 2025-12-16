import './post.css'

import NavBarComponent from "../../components/navbar/NavBarComponent"

import type { FormEvent } from 'react';

//MS form exemple pris dans site https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/ pour voir 


export default function CreatePost() {

    const date = new Date();
    const datefr = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",   // ← mois en toutes lettres
        year: "2-digit", // ← année sur 2 chiffres
    });
    const hourTime = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    // MS pour que ça marche entre le back-end et le front-end ici début
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const content = formData.get("post");

        if (!content || typeof content !== "string") return;

        try {
            await fetch("http://localhost:8000/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ content }),
            });

            // MS optionnel : reset form
            // e.currentTarget.reset();

        } catch (error) {
            console.error("Erreur création post", error);
        }
    }



    // MS pour que ça marche entre le back-end et le front-end ici fin 
    return (
        <div className="post">
            <div className="post-content">
                <h1 className="post-title"></h1>

                <form className='createpost-form' onSubmit={handleSubmit}>
                    <div className="textarea-container">
                        <textarea
                            name="post"
                            placeholder="Tapez votre post ici..."
                            className="post-input"
                        />

                        <p className="date">

                            {hourTime}:{minutes} - {datefr}
                        </p>
                    </div>

                    <button className='poster'>Poster !</button>
                </form>
            </div>

            <NavBarComponent />
        </div>


    )
}