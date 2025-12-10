import './post.css'
// MS import NavBarComponent from "../../components/navbar/NavBarComponent" à activer par la personne concernée après validation de mon travail sur NavBar


export default function CreatePost() {



    return (
        <div className="post">
            <h1 className="post-title">New Post</h1>
            <form className='createpost-form'>
                <div className="textarea-container">
                <textarea
                    name="post"
                    placeholder="Tapez votre post ici..."
                    className="post-input"
                />
                
                <p className="date">
                    15:25 - 13 août 25
                    {/* Ms afficher la date ici */}
                </p>
                </div>
                    {/* <input type="submit" value="Poster !" /> */}
                    <button className='poster' type="submit">Poster !</button>
                
            </form>
            {/* <NavBarComponent/> MS NavBarComponent à activer par la personne concernée après validation de mon travail sur NavBar mettre gohome et comment/chat */}

        </div>


    )
}



//MS form exemple pris dans site https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/ pour voir 

// import './post.css'

// export default function CreatePost() {
//     return (
//         <div className="post">
//             <h1>New Post</h1>

//             <form className="createpost-form">

//                 {/* Zone de texte */}


//                 {/* Date */}
//                 <p className="date">
//                     15:25 - 13 août 25
//                 </p>

//                 {/* Bouton */}
//                 <button type="submit" className="post-button">
//                     Poster !
//                 </button>
//             </form>
//         </div>
//     )
// }
