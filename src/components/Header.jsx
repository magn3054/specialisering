import { Link } from "react-router-dom";
import style from "./Header.module.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Header() {
    useEffect(() => {}, [useLocation().pathname]); // Sørger for at komponenten gen-renderes ved ændring i URL-sti

    return (
        <header>
            <Link to="/"><img className={style.logo} src={Logo} alt="Logo" /></Link>
            <nav>
                <ul>
                    <li></li>
                </ul>
            </nav>
        </header>
    )
}

