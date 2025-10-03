import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/style.css";
import "./styles/hamburger.css";
import "./styles/responsive.css";

export default function App(){
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/:userId" element={<UserDetail />} />
                <Route path="*" element={<h2 style={{ padding: 24 }}>404 - Page non trouvée</h2>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}