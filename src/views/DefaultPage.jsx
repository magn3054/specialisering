import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from "./DefaultPage.module.css";
import CharacterSelector from "../components/CharacterSelector";
import PortalButton from "../components/PortalButton";

export default function DefaultPage() {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isTalking, setTalkingStates] = useState({ filosofus: false, logon: false, luna: false });
    const [isShrinking, setIsShrinking] = useState(false);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    const handleSelect = (name) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        if (selectedCharacter === name) {
            setSelectedCharacter(null);
            setTalkingStates({ filosofus: false, logon: false, luna: false });
        } else {
            setSelectedCharacter(name);
            setTalkingStates({
                filosofus: name === "filosofus",
                logon: name === "logon",
                luna: name === "luna"
            });

            const audio = new Audio(`/stemmer/velkommen-${name}.mp3`);
            audioRef.current = audio;
            audio.play();
            audio.addEventListener("ended", () => {
                setTalkingStates({ filosofus: false, logon: false, luna: false });
            });
        }
    };

    const handlePortalClick = () => {
        if (!selectedCharacter) return;

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        setIsShrinking(true);
        setTimeout(() => {
            navigate("/skygge-hulen", { state: { selectedCharacter } });
        }, 1000);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.sceneBackground} />
            <PortalButton
                isSpinning={!!selectedCharacter}
                onClick={handlePortalClick}
                disabled={!selectedCharacter}
            />

            <div className={style.main}>
                <h1 className={style.title}>Vælg din karakter</h1>

                <CharacterSelector
                    name="filosofus"
                    isSelected={selectedCharacter === "filosofus"}
                    isTalking={isTalking.filosofus}
                    isShrinking={isShrinking}
                    onSelect={handleSelect}
                />

                <CharacterSelector
                    name="luna"
                    isSelected={selectedCharacter === "luna"}
                    isTalking={isTalking.luna}
                    isShrinking={isShrinking}
                    onSelect={handleSelect}
                />
            </div>
        </div>
    );
}
