import { Link } from 'react-router';
import './navbar.css'
import { useState } from 'react';
import * as React from 'react'
import { useLocation } from 'react-router'

// https://api.reactrouter.com/v7/functions/react_router.useLocation.html
// le lien pour m'aider à afficher tels boutons dans telles pages



// function SomeComponent() {
//   let location = useLocation()

//   React.useEffect(() => {
//     // Google Analytics
//     ga('send', 'pageview')
//   }, [location]);

//   return (
//     // ne pas utiliser ce useeffeect pour ma navbar MS...
//   );
// }




export default function NavBarComponent() {
    {
        location != "/profile/:id"
            && <li></li>
    }
    //écrire ça le && est le if si la location est différente du chemin /profile/:id ça affiche telle page avce tels boutons


    //MS cacher certains boutons dans la navbar dans les pages suivantes :
    // - Accueil Feed la navbar a deux boutons plus create et gohome (icône bonhomme)
    // -Page Post (route : /post/:id) elle a les 3 boutons createplus, gohome et comment/chat
    // -Page Profile(route: /profile/:id) elle les boutons pluscreate et comment/chat
    // -New Post (route: /create/post) elle deux boutons home et comment/chat



    return (
        <footer className="navigation">
            {
                condition &&
                <Link>
                    <li className="list">
                        <a href="">
                            <span className="icon">
                                <img src="assets/Createplus.svg" alt="create plus" />
                            </span>

                        </a>

                    </li>
                </Link>
            }
            <li className="list">
                <a href="">
                    <span className="icon">
                        <img src="assets/GoHome.svg" alt="Go Home " />
                    </span>

                </a>

            </li>
            <li className="list">
                <a href="">
                    <span className="icon">

                        <img src="assets/comment-alt.svg" alt="comment" />   </span>

                </a>

            </li>


        </footer>
    )
}