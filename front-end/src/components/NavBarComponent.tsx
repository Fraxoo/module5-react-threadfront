import plusLogo from "../assets/plus.png"
import convLogo from "../assets/conv.png"
import HomeLogo from "../assets/GoHome.png"
import { Link, useLocation } from "react-router"
import { useAuth } from "../context/AuthContext"


export default function NavBarComponent() {

    const location = useLocation();

    const { user } = useAuth();

    const isProfil = location.pathname.startsWith("/profil/")

    return (
        <footer>
            <Link className={location.pathname === "/create/post" ? "hidden" : "nav-icon"}
                to={"/create/post"}><img src={plusLogo} alt="Add"></img></Link>

            <Link className={isProfil ? "hidden" : "nav-icon"}
                to={`/profil/${user?.id}`}><img src={HomeLogo} alt="profil"></img></Link>

            <Link className={location.pathname === "/home" ? "hidden" : "nav-icon"}
                to={"/home"}><img src={convLogo} alt="Home"></img></Link>
        </footer>
    )
}