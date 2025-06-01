import { useState, useEffect } from "react";

export default function useTrophies() {
    // State for hvilke pokaler brugeren har låst op
    const [trophies, setTrophies] = useState(() => {
        // Hent initial værdi fra localStorage
        const stored = localStorage.getItem("trophies");
        return stored ? JSON.parse(stored) : {};
    });

    // Gemmer pokaler i localStorage ved ændringer
    useEffect(() => {
        localStorage.setItem("trophies", JSON.stringify(trophies));
    }, [trophies]);

    // Funktion til at låse en pokal op
    const unlockTrophy = (key) => {
        setTrophies((prev) => ({ ...prev, [key]: true }));
    };

    return { trophies, unlockTrophy };
}
