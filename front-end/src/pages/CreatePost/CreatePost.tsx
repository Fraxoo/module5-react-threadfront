import './post.css'

import NavBarComponent from "../../components/navbar/NavBarComponent" ;

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

                           {hourTime}:{minutes} - {datefr} 
                        </p>
                    </div>

                    <button className='poster' type="submit">Poster !</button>
                </form>
            </div>

              <NavBarComponent/> 
        </div>

       
    )
}