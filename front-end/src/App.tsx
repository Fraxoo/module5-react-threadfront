import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import '../src/style.css';



export default function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
            </Routes>

    );
}
