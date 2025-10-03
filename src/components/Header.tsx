import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header(){
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Ensure a deterministic attribute on both html and body
    useEffect(() => {
        if (open) {
            document.documentElement.setAttribute("data-nav-open", "true");
            document.body.setAttribute("data-nav-open", "true");
        } else {
            document.documentElement.removeAttribute("data-nav-open");
            document.body.removeAttribute("data-nav-open");
        }
    }, [open]);

    const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "ocean");
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <header>
            <div className="header-inner container">
                <Link to="/" className="logo" aria-label="Accueil">
                    <img src="/logo.png" alt="Logo Mon Portail" height={150} />
                </Link>

                <button
                    className="hamburger"
                    type="button"
                    aria-label="Menu"
                    aria-controls="mainnav"
                    aria-expanded={open}
                    onClick={() => {
                        console.log("hamburger clicked (open before):", open);
                        setOpen(o => !o);
                    }}
                    style={{ zIndex: 9999 }} // bring button above overlays if needed
                >
                    <span className="bar" aria-hidden="true"></span>
                    <span className="bar" aria-hidden="true"></span>
                    <span className="bar" aria-hidden="true"></span>
                </button>

                <nav id="mainnav" className="nav-collapsible" onClick={() => setOpen(false)}>
                    <NavLink to="/" end>Accueil</NavLink>
                    <NavLink to="/user/1">User test</NavLink>

                    <button
                        className="theme-toggle"
                        type="button"
                        aria-label="Changer de thème"
                        onClick={() => setTheme(t => t === "ocean" ? "retro" : "ocean")}
                    >
                        <span className="track"><span className="thumb"></span></span>
                        <span className="label">Thème</span>
                    </button>
                </nav>
            </div>
        </header>
    );
}