import './post.css'
import { utcToZonedTime } from  'date-fns-tz' 
// MS import NavBarComponent from "../../components/navbar/NavBarComponent" à activer par la personne concernée après validation de mon travail sur NavBar

//MS form exemple pris dans site https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/ pour voir 

// ancien code ci-dessus

export default function CreatePost() {
    const convertToTimezone = ( utcDate : string , timeZone : string ): Date => { 
  return  utcToZonedTime (utcDate, timeZone); 
}; 

// Exemple d'utilisation 
const tokyoTime = convertToTimezone ( "2024-11-17T10:15:30.000Z" , "Asia/Tokyo" ); 
console.log ( tokyoTime); // Sortie
 : '2024-11-17T19:15:30.000+09:00' 
// Ceci est particulièrement utile pour les applications prenant en charge plusieurs régions.

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
                            15:25 - 13 août 25
                        </p>
                    </div>
                    
                    <button className='poster' type="submit">Poster !</button>
                </form>
            </div>
                {/* <NavBarComponent/> MS NavBarComponent à activer par la personne concernée après validation de mon travail sur NavBar mettre gohome et comment/chat */}

        </div>
    )
}