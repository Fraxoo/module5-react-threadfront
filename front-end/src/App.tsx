import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Post from "./pages/CreatePost/Post";
// MS ajout routes CreatePost



export default function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create/post" element={<Post />} />
            </Routes>

    );
}
