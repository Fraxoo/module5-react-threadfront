import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Post from "./pages/create/Post"; 
// à activer
import Profile from "./pages/profile/Profile";
//  à activer ça correspond à /profile/:id
import Posts from "./pages/post/Posts";  
// à activer ça correspond à DetailPost/post/:id 
// J'ai mis Posts ave s S sinon react ne pourra pas lire le post de create/post
import '../src/style.css';



export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* MS à activer   */}
            <Route path="/create/post" element={<Post />} />
            {/* MS à activer   */}
            
            <Route path="/profile/profile" element={<Profile />} />
            {/* MS à activer   */}
            <Route path="/post/post" element={<Posts />} />
        </Routes>

    );
}


