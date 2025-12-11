import './post.css'

// MS import NavBarComponent from "../../components/navbar/NavBarComponent" à activer par la personne concernée après validation de mon travail sur NavBar

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
    const month = date.getMonth();


    return (
        <div className="post">
            <div className="post-content">
                <h1 className="post-title"></h1>

                <form className='createpost-form'>
                    <div className="textarea-container">
                        <textarea
                            name="post"
                            placeholder="Tapez votre post ici..."
                            className="post-input"
                        />

                        <p className="date">
                            {/* 15:25 - 13 août 25 */}

                           {hourTime}:{minutes} - {datefr} 
                        </p>
                    </div>

                    <button className='poster' type="submit">Poster !</button>
                </form>
            </div>
            {/* <NavBarComponent/> MS NavBarComponent à activer par la personne concernée après validation de mon travail sur NavBar mettre gohome et comment/chat */}

        </div>
    )
}