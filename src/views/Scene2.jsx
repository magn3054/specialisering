import style from "./Scene2.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CharacterTalker from "../components/CharacterTalker.jsx";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PuzzlePiece from "../components/PuzzlePiece";
import PuzzleShadow from "../components/PuzzleShadow";
import silhouette from "../assets/silhouette.svg";
import leftEar from "../assets/ear-left.svg";
import rightEar from "../assets/ear-right.svg";
import topPiece from "../assets/kat-top.svg";
import bottomPiece from "../assets/kat-bund.svg";
import leftEye from "../assets/eye-left.svg";
import rightEye from "../assets/eye-right.svg";


export default function DestinationPage() {
    const [placedPieces, setPlacedPieces] = useState({});

    const handleDrop = (pieceId, shadowId) => {
        setPlacedPieces(prev => {
            const updated = Object.fromEntries(
                Object.entries(prev).filter(([_, val]) => val !== pieceId)
            );

            if (shadowId === "source") return updated;

            return {
                ...updated,
                [shadowId]: pieceId
            };
        });
    };

    const location = useLocation();
    const { selectedCharacter } = location.state || { selectedCharacter: "filosofus" };
    const [isTalking, setTalkingStates] = useState({
        filosofus: false,
        logon: false,
        luna: false
    });
    const dropZonePositions = [
        { id: "leftEar", x: "32vw", y: "30vh" },
        { id: "rightEar", x: "52vw", y: "30vh" },
        { id: "topPiece", x: "31vw", y: "37vh" },
        { id: "bottomPiece", x: "31vw", y: "47vh" },
        { id: "leftEye", x: "41vw", y: "36vh" },
        { id: "rightEye", x: "52vw", y: "36vh" },
    ];

    const pieceData = [ // start positioner
        { id: "leftEar", image: leftEar, position: { x: "20vw", y: "45vh" }, alt: "Left Ear", widthS: 60 },
        { id: "rightEar", image: rightEar, position: { x: "5vw", y: "35vh" }, alt: "Right Ear", width: 60 },
        { id: "topPiece", image: topPiece, position: { x: "5vw", y: "45vh" }, alt: "Top Piece", width: 150 },
        { id: "bottomPiece", image: bottomPiece, position: { x: "20vw", y: "25vh" }, alt: "Bottom Piece", width: 150 },
        { id: "leftEye", image: leftEye, position: { x: "20vw", y: "35vh" }, alt: "Left Eye", width: 25 },
        { id: "rightEye", image: rightEye, position: { x: "5vw", y: "25vh" }, alt: "Right Eye", width: 25 },
    ];

    const correctPlacement = {
        slot0: "leftEar",
        slot1: "rightEar",
        slot2: "topPiece",
        slot3: "bottomPiece",
        slot4: "rightEye",
        slot5: "leftEye",
    };

    const checkIfPuzzleIsSolved = (placed) => {
        return Object.entries(correctPlacement).every(
            ([slot, pieceId]) => placed[slot] === pieceId
        );
    };

    useEffect(() => {
        if (Object.keys(placedPieces).length === Object.keys(correctPlacement).length) {
            if (checkIfPuzzleIsSolved(placedPieces)) {
                alert("🎉 Du løste Skygge hulens mysterie!\n(En pris burde være tilføjet til brugerens pokal menu)");
            }
        }
    }, [placedPieces]); // 👈 kør hver gang placedPieces ændres

    return (
        <div className={style.wrapper}>
            <div className={style.sceneBackground} />

            <div className={style.characterBox}>
                <CharacterTalker
                    baseName={selectedCharacter}
                    isTalking={isTalking.filosofus}
                    interval={150}
                    size={350}
                />
            </div>

            <DndProvider backend={HTML5Backend}>
                <div style={{ position: "relative", width: "100%", height: "100vh" }}>
                    <img
                        src={silhouette}
                        alt="silhouette"
                        style={{
                            position: "absolute",
                            top: "30vh",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "40vw",
                        }}
                    />

                    {/* Drop zones på silhouetten */}
                    {dropZonePositions.map((pos, i) => {
                        const shadowId = `slot${i}`;
                        const pieceId = placedPieces[shadowId];
                        const piece = pieceData.find(p => p.id === pieceId);
                        const pieceSize = pieceData[i];
                        console.log("Rendering shadow for:", shadowId, "with piece:", pieceId);

                        return (
                            <PuzzleShadow
                                key={i}
                                id={shadowId}
                                onDrop={handleDrop}
                                position={pos}
                                width={pieceSize?.width || 60}
                                height={pieceSize?.height || 60}
                            >
                                {piece && (
                                    <PuzzlePiece
                                        id={piece.id}
                                        image={piece.image}
                                        alt={piece.alt}
                                        position={pos}
                                        isInDropZone={true}
                                        width={piece.width}
                                        height={piece.height}
                                    />
                                )}
                            </PuzzleShadow>
                        );
                    })}

                    {/* ekstra plads til returnering af pieces */}
                    <PuzzleShadow
                        id="source"
                        onDrop={handleDrop}
                        position={{ x: 0, y: 0 }}
                    />

                    {/* Puzzle pieces start positioner */}
                    {pieceData.map(piece => {
                        const isPlaced = Object.values(placedPieces).includes(piece.id);
                        if (isPlaced) return null;
                        return (
                            <PuzzlePiece
                                key={piece.id}
                                id={piece.id}
                                image={piece.image}
                                alt={piece.alt}
                                position={piece.position}
                            />
                        );
                    })}
                </div>
            </DndProvider>
        </div>
    );
}