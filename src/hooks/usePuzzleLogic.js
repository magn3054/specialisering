import { useState, useEffect } from "react";

export default function usePuzzleLogic(correctPlacement, onSolved) {
    // State med placerede brikker - map fra drop zone id til puslespilsbrik id
    const [placedPieces, setPlacedPieces] = useState({});

    // Funktion til at opdatere placering ved drop event
    const handleDrop = (pieceId, shadowId) => {
        setPlacedPieces(prev => {
            // Fjern tidligere placeringer af samme brik (så den kun er ét sted)
            const updated = Object.fromEntries(
                Object.entries(prev).filter(([_, val]) => val !== pieceId)
            );
            // Hvis brikken droppes i "source" fjernes den blot
            if (shadowId === "source") return updated;

            // Tilføj ny placering
            return {
                ...updated,
                [shadowId]: pieceId,
            };
        });
    };

    // Tjek om puslespillet er løst
    const checkIfPuzzleIsSolved = (placed) => {
        return Object.entries(correctPlacement).every(
            ([slot, pieceId]) => placed[slot] === pieceId
        );
    };

    // Effekt der lytter på ændringer i placerede brikker
    useEffect(() => {
        // Hvis alle brikker er placeret og puslespillet er korrekt løst kaldes callback
        if (Object.keys(placedPieces).length === Object.keys(correctPlacement).length) {
            if (checkIfPuzzleIsSolved(placedPieces)) {
                onSolved();
            }
        }
    }, [placedPieces]);

    // Returnerer placerede brikker og drop handler
    return { placedPieces, handleDrop };
}
