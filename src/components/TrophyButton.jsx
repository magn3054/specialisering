import React, { useState } from "react";
import TrophyModal from "./TrophyModal";
import trophyIcon from "../assets/trophy.svg"; 

export default function TrophyButton() {
    const [open, setOpen] = useState(false); // State til om modal er åben

    return (
        <>
            {/* Knap der åbner pokal-modal */}
            <button
                onClick={() => setOpen(true)}
                style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    filter: "drop-shadow(0 0 0.25rem rgba(255, 255, 255, 0.5))",
                }}
            >
                <img src={trophyIcon} alt="Trophies" style={{ width: "50px" }} />
            </button>

            {/* Vis modal hvis open er true */}
            {open && <TrophyModal onClose={() => setOpen(false)} />}
        </>
    );
}
