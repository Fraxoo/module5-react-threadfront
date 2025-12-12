import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
// import Post from "./pages/CreatePost/Post"; à activer
// import Profile from "./pages/Profile/profile"; à activer ça correspond à /profile/:id
//import Post from "./pages/DetailPost/post";  à activer ça correspond à DetailPost/post/:id
import '../src/style.css';



export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* MS à activer  <Route path="/create/post" element={<Post />} /> */}
            {/* MS à activer  <Route path="/profile/profile" element={<Profile />} /> */}
            {/* MS à activer  <Route path="/detailpost/post" element={<Post />} /> */}
        </Routes>

    );
}


