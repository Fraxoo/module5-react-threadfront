import './createPost.css'

import NavBarComponent from "../../components/navbar/NavBarComponent"

import type { FormEvent } from 'react'

import { useState } from 'react';

//MS form exemple pris dans site https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/ pour voir 


export default function CreatePost() {
    const [error, setError] = useState<string | null>(null);
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
          setError(null);
        const formTag = e.currentTarget;
        const formData = new FormData(e.currentTarget);
        const content = formData.get("post");
        
        if (!content || typeof content !== "string" || content.trim() === "") {
            setError("Le contenu du post est vide");
            return;
        }
        
        try {
            const res = await fetch("http://localhost:8000/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,// sert a rien
                },
                credentials: "include",
                body: JSON.stringify({ content: content.trim() }),
            });
            console.log(formTag);
            
            console.log(res);



            const data = await res.json();

            console.log(data);

            if (!res.ok) {

                if (data.errors && data.errors.length > 0) {
                    setError(data.errors[0].message);
                } else {
                    setError("Erreur inconnue/erreur 500");
                }

                return;//utiliser un state john m'a fait cette base
            }
          
            console.log(e.target)
            formTag.reset();

            // MS optionnel : reset form
            // e.currentTarget.reset();

        } catch (error) {
            console.error("Erreur création post", error);
            setError("Impossible de contacter le serveur");
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

                        {error && <p className="error">{error}</p>}
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