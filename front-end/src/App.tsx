import { Route, Routes,useLocation } from "react-router";
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
import "./style.css"
import { AuthProvider } from "./context/AuthContext";
import NavBarComponent from "./components/navbar/NavBarComponent";



export default function App() {
// Pour éviter que la navbar s'affiche partout MS

    const location = useLocation();

    // Pages où on NE veut PAS la navbar
    const hideNavbarRoutes = ["/login", "/register"];

    const hideNavbar = hideNavbarRoutes.includes(location.pathname);

    return (
        <AuthProvider>
            <section>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/createpost/post" element={<CreatePost />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/post/:postId" element={<Post />} />
                    </Routes>

                </main>

                   {!hideNavbar && <NavBarComponent />}
            </section>
        </AuthProvider>

    );
}


