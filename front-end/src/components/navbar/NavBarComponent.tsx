import { Link } from 'react-router';
import './navbar.css'
import { useLocation } from 'react-router'

// https://api.reactrouter.com/v7/functions/react_router.useLocation.html
// le lien pour m'aider à afficher tels boutons dans telles pages


export default function NavBarComponent() {


    const location = useLocation();


    //MS cacher certains boutons dans la navbar dans les pages suivantes avec les conditons &&:
    // - Accueil Feed la navbar a deux boutons create post et profile
    // -Page Post (route : /post/:id) elle a les 3 boutons createpost, profile et accueil
    // -Page Profile(route: /profile/:id) elle les boutons create post et accueil
    // -New Post (route: /create/post) elle deux boutons profile et accueil
    //     Explications :
    // location.pathname : C'est la propriété qui contient le chemin actuel (ex: "/", "/profile/123", etc.)
    // Pour le bouton Create Post : location.pathname !== "/createpost/post" - il s'affiche partout sauf sur la page de création de post
    // Pour le bouton Profile : location.pathname.startsWith("/profile/") - j'utilise startsWith car l'URL contient un ID dynamique (:id)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
    // Pour le bouton Accueil : location.pathname !== "/" - il s'affiche partout sauf sur la page d'accueil



    return (
        <footer className="navigation">
            <div className='createpost'>
                {location.pathname !== "/createpost/post" &&
                    (<Link to="/createpost/post">
                        <li className="list">
                            <span className="icon">
                                <img src="/assets/Createpost.svg" alt="create post" />
                            </span>
                            <span className='text'>Create</span>
                        </li>
                    </Link>)
                }
            </div>
            <div className='profile'>
                {!location.pathname.startsWith("/profile/") && (
                    <Link to="/profile/profile">
                        <li className="list">
                            <span className="icon">
                                <img src="/assets/profile.svg" alt="profile " />
                            </span>
                             <span className='text'>Profile</span>
                        </li>
                    </Link>)}
            </div>
            <div className='accueil'>
                {location.pathname !== "/" && location.pathname !== "/home" && (
                    <Link to="/">
                        <li className="list">
                            <span className="icon">
                                <img src="/assets/accueil.svg" alt="accueil" />
                            </span>
                             <span className='text'>Home</span>
                        </li>
                    </Link>
                )}
            </div>
            <div className="indicator"></div>
        </footer>
    )
}

