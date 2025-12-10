import './post.css'
// MS import NavBarComponent from "../../components/navbar/NavBarComponent" à activer par la personne concernée après validation de mon travail sur NavBar


export default function CreatePost() {



    return (
        <div className="post">
            <h1>New Post</h1>
            <form>
                <div>
                    <label>
                        Tapez votre post ici
                        <input type="text" name="post" />
                    </label>
                </div>
                <div>
                    <label className='date'>
                    15:25 - 13 aout 25
                    </label>
                </div>
                <div className='poster'>
                    <input type="submit" value="Poster !" />
                </div>
            </form>
            {/* <NavBarComponent/> MS NavBarComponent à activer par la personne concernée après validation de mon travail sur NavBar mettre gohome et comment/chat */}

        </div>


    )
}



//MS form exemple pris dans site https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/ pour voir 

