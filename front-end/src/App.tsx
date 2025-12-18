import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Post from "./pages/post/Post";
import CreatePost from "./pages/create/Post";
import Profile from "./pages/profile/Profile";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import "./style.css"
import AppLayout from "./components/appLayout";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/create/post" element={<CreatePost />} />
                    <Route path="/profil/:id" element={<Profile />} />
                    <Route path="/post/:id" element={<Post />} />
                </Route>

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </AuthProvider>

    );
}
