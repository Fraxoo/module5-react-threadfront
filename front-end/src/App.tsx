import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Post from "./pages/post/Post";



export default function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/post/:postId" element={<Post />} />
            </Routes>

    );
}
