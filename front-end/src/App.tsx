import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import CreatePost from "./pages/CreatePost/CreatePost";
// à activer
import Profile from "./pages/profile/Profile";
//  à activer ça correspond à /profile/:id
import Post from "./pages/post/Post";
// à activer ça correspond à DetailPost/post/:id 
import '../src/style.css';
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import NavBarComponent from "./components/navbar/NavBarComponent";
//import "./style.css" MS chemin pas bon qui ne vient pas de mon code car le style doit être mius dans src




export default function App() {
    return (
        <section>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/createpost/post" element={<CreatePost />} />
                    <Route path="/profile/profile" element={<Profile />} />
                    <Route path="/post/post" element={<Post />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/post/:postId" element={<Post />} />
                </Routes>

            </main>

            <NavBarComponent />
        </section>
    );
}


