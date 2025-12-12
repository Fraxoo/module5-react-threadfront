import { Link } from 'react-router';
import './navbar.css'
import { useState } from 'react';
import * as React from 'react'
import { useLocation } from 'react-router'

// https://api.reactrouter.com/v7/functions/react_router.useLocation.html
// le lien pour m'aider à afficher tels boutons dans telles pages


export default function NavBarComponent() {
    {
        location != "/profile/:id"
            && <li></li>
    }

    //MS cacher certains boutons dans la navbar dans les pages suivantes :
    // - Accueil Feed la navbar a deux boutons create post et profile
    // -Page Post (route : /post/:id) elle a les 3 boutons createpost, profile et accueil
    // -Page Profile(route: /profile/:id) elle les boutons create post et accueil
    // -New Post (route: /create/post) elle deux boutons profile et accueil



    return (
        <footer className="navigation">
            {
                condition &&
                <Link to="/createpost/post">
                    <li className="list">
                        <span className="icon">
                            <img src="assets/Createpost.svg" alt="create post" />
                        </span>
                    </li>
                </Link>
            }
            <Link to="/profile/profile">
                <li className="list">
                    <span className="icon">
                        <img src="assets/profile.svg" alt="profile " />
                    </span>
                </li>
            </Link>
            <Link to="/">
                <li className="list">
                    <span className="icon">
                        <img src="assets/accueil.svg" alt="accueil"/>   </span>
                </li>
            </Link>
        </footer>
    )
}