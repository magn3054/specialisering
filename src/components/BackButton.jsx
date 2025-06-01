import { useNavigate } from "react-router-dom";
import style from "./BackButton.module.css";
import backArrow from "../assets/back-arrow.svg"; 

export default function BackButton() {
    const navigate = useNavigate();

    // Funktion der navigerer brugeren tilbage til startsiden ("/")
    const handleClick = () => {
        navigate("/");
    };

    // Render en knap med et pil-ikon, som kalder handleClick ved klik
    return (
        <button onClick={handleClick} className={style.backButton}>
            <img src={backArrow} alt="Tilbage" className={style.icon} />
        </button>
    );
}
