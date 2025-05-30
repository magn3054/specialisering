import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from "./DefaultPage.module.css";
import characterStyles from "../components/CharacterStyles.module.css";
import CharacterTalker from "../components/CharacterTalker.jsx";

export default function DefaultPage() {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isTalking, setTalkingStates] = useState({ filosofus: false, logon: false, luna: false });
    const [isShrinking, setIsShrinking] = useState(false);

    const navigate = useNavigate();
    const audioRef = useRef(null);


    const handleSelect = (name) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        if (selectedCharacter === name) { // Hvis allerede valgt, fjern valg og stop alt
            setSelectedCharacter(null);
            setTalkingStates({ filosofus: false, logon: false, luna: false });
        } else { // Sæt karaktervalg og tale-tilstand
            setSelectedCharacter(name);
            setTalkingStates({
                filosofus: name === "filosofus",
                logon: name === "logon",
                luna: name === "luna"
            });

            // Afspil lyd
            const audio = new Audio(`/stemmer/velkommen-${name}.mp3`);
            audioRef.current = audio;
            audio.play();

            // Når lyden slutter, stop animation
            audio.addEventListener("ended", () => {
                setTalkingStates({
                    filosofus: false,
                    logon: false,
                    luna: false
                });
            });
        }
    };

    const handlePortalClick = () => {
        if (!selectedCharacter) return;
        setIsShrinking(true);
        setTimeout(() => {
            navigate("/scene2", { state: { selectedCharacter } });
        }, 1000);
    };

    const isSpinning = selectedCharacter !== null;

    return (
        <div className={style.wrapper}>
            <div className={style.sceneBackground} />
            <div
                className={`${style.portal} ${isSpinning ? style.portalActive : ""}`}
            />
            <div
                className={style.portalClickArea}
                onClick={handlePortalClick}
            />

            <div className={style.main}>
                <h1 className={style.title}>Vælg din karakter</h1>
                <div
                    className={`
                        ${characterStyles.filosofus} 
                        ${selectedCharacter === "filosofus" ? characterStyles.selected : ""} 
                        ${isShrinking && selectedCharacter === "filosofus" ? characterStyles.shrink : ""}
                    `}
                    onClick={() => handleSelect("filosofus")}
                >
                    <CharacterTalker
                        baseName="filosofus"
                        isTalking={isTalking.filosofus}
                        interval={150}
                        size={350}
                    />
                </div>
                <div
                    className={`
                        ${characterStyles.luna} 
                        ${selectedCharacter === "luna" ? characterStyles.selected : ""} 
                        ${isShrinking && selectedCharacter === "luna" ? characterStyles.shrink : ""}
                    `}
                    onClick={() => handleSelect("luna")}
                >
                    <CharacterTalker
                        baseName="luna"
                        isTalking={isTalking.luna}
                        interval={150}
                        size={350}
                    />
                </div>
            </div>
        </div>
    )
}