import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Post from "./pages/CreatePost/Post";
import '../src/style.css';
// MS ajout routes CreatePost et style.css le css principal



export default function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create/post" element={<Post />} />
            </Routes>

    );
}
