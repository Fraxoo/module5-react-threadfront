import { useAuth } from "../../context/AuthContext"


export default function Home() {

    const  {user}= useAuth();
    console.log(user);
    

    return (
        <p>yo</p>
    )
}