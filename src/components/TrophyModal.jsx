import React from "react";
import style from "./TrophyModal.module.css";
import trophyShadow from "../assets/cave-trophy.svg";
import useTrophies from "../hooks/useTrophies";

export default function TrophyModal({ onClose }) {
    // Hent pokaler fra custom hook
    const { trophies } = useTrophies();

    // Map med billeder til hver pokal-type
    const trophyImages = {
        shadow: trophyShadow,
        // tilføj de andre pokaler her
    };

    // Liste over alle pokal slots // flere slots kan tilføjes senere
    const slots = ["shadow", "trophy2", "trophy3"];

    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <h3 className={style.title}>Dine Pokaler</h3>
                <div className={style.slotContainer}>
                    {slots.map((key) => (
                        <div key={key} className={style.slot}>
                            {/* Hvis pokal er unlocked vis billede ellers spørgsmålstegn */}
                            {trophies[key] ? (
                                <img src={trophyImages[key]} alt={`Trophy ${key}`} className={style.trophy} />
                            ) : (
                                <div className={style.empty}>?</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
