import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";



export default function App() {
    return (
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
            </Routes>

    );
}
