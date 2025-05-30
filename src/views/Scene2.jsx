import style from "./Scene2.module.css";
import { useState } from "react";
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
            // Remove from any existing slot
            const updated = Object.fromEntries(
                Object.entries(prev).filter(([_, val]) => val !== pieceId)
            );

            // If dropped in source, don't place it anywhere
            if (shadowId === "source") return updated;

            // Place in new slot
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
        { x: 125, y: 200 }, // venstre øre
        { x: 210, y: 200 }, // Højre øre
        { x: 165, y: 250 }, // kat top
        { x: 145, y: 260 }, // venstre øje
        { x: 190, y: 260 }, // højre øje
        { x: 165, y: 300 }, // kat bund
    ];

    const pieceData = [ // start positioner
        { id: "leftEar", image: leftEar, position: { x: 100, y: 500 }, alt: "Left Ear" },
        { id: "rightEar", image: rightEar, position: { x: 175, y: 500 }, alt: "Right Ear" },
        { id: "topPiece", image: topPiece, position: { x: 100, y: 600 }, alt: "Top Piece" },
        { id: "bottomPiece", image: bottomPiece, position: { x: 160, y: 600 }, alt: "Bottom Piece" },
        { id: "leftEye", image: leftEye, position: { x: 175, y: 400 }, alt: "Left Eye" },
        { id: "rightEye", image: rightEye, position: { x: 100, y: 400 }, alt: "Right Eye" },
    ];

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

                    {/* Drop zones on silhouette */}
                    {dropZonePositions.map((pos, i) => {
                        const shadowId = `slot${i}`;
                        const pieceId = placedPieces[shadowId];
                        const piece = pieceData.find(p => p.id === pieceId);

                        return (
                            <PuzzleShadow
                                key={i}
                                id={shadowId}
                                onDrop={handleDrop}
                                position={pos}
                            >
                                {piece && (
                                    <PuzzlePiece
                                        id={piece.id}
                                        image={piece.image}
                                        alt={piece.alt}
                                        position={pos}
                                        isInDropZone={true}
                                    />
                                )}
                            </PuzzleShadow>
                        );
                    })}

                    {/* Return area drop zone */}
                    <PuzzleShadow
                        id="source"
                        onDrop={handleDrop}
                        position={{ x: 0, y: 0 }}
                    />

                    {/* Puzzle pieces that haven't been placed */}
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