import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Register from "./pages/Auth/register";
import "./style.css"



export default function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
            </Routes>

    );
}
