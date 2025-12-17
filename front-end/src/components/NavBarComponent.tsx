import plusLogo from "../assets/plus.png"
import convLogo from "../assets/conv.png"
import HomeLogo from "../assets/GoHome.png"
import { Link } from "react-router"


export default function NavBarComponent() {


    return (
        <footer>
            <Link to={"/create/post"}><img src={plusLogo} alt="Add"></img></Link>
            <Link to={"/profil"}><img src={HomeLogo} alt="profil"></img></Link>
            <Link to={"/home"}><img src={convLogo} alt="Home"></img></Link>
        </footer>
    )
}