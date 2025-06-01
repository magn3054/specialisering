import style from "./Scene2.module.css";
import { useLocation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useTrophies from "../hooks/useTrophies";
import usePuzzleLogic from "../hooks/usePuzzleLogic";

import CharacterTalker from "../components/CharacterTalker.jsx";
import PuzzleBoard from "../components/PuzzleBoard.jsx";

import silhouette from "../assets/silhouette.svg";
import leftEar from "../assets/ear-left.svg";
import rightEar from "../assets/ear-right.svg";
import topPiece from "../assets/kat-top.svg";
import bottomPiece from "../assets/kat-bund.svg";
import leftEye from "../assets/eye-left.svg";
import rightEye from "../assets/eye-right.svg";

export default function DestinationPage() {
    const location = useLocation();
    const { selectedCharacter } = location.state || { selectedCharacter: "filosofus" };

    const dropZonePositions = [
        { id: "leftEar", x: "32vw", y: "30vh" },
        { id: "rightEar", x: "52vw", y: "30vh" },
        { id: "topPiece", x: "31vw", y: "37vh" },
        { id: "bottomPiece", x: "31vw", y: "47vh" },
        { id: "leftEye", x: "41vw", y: "36vh" },
        { id: "rightEye", x: "52vw", y: "36vh" },
    ];

    const pieceData = [
        { id: "leftEar", image: leftEar, position: { x: "20vw", y: "85vh" }, alt: "Left Ear", width: 60 },
        { id: "rightEar", image: rightEar, position: { x: "5vw", y: "70vh" }, alt: "Right Ear", width: 60 },
        { id: "topPiece", image: topPiece, position: { x: "5vw", y: "85vh" }, alt: "Top Piece", width: 150 },
        { id: "bottomPiece", image: bottomPiece, position: { x: "20vw", y: "60vh" }, alt: "Bottom Piece", width: 150 },
        { id: "leftEye", image: leftEye, position: { x: "20vw", y: "70vh" }, alt: "Left Eye", width: 25 },
        { id: "rightEye", image: rightEye, position: { x: "5vw", y: "60vh" }, alt: "Right Eye", width: 25 },
    ];

    const correctPlacement = {
        slot0: "leftEar",
        slot1: "rightEar",
        slot2: "topPiece",
        slot3: "bottomPiece",
        slot4: "rightEye",
        slot5: "leftEye",
    };

    const { unlockTrophy } = useTrophies();

    const { placedPieces, handleDrop } = usePuzzleLogic(correctPlacement, () => {
        unlockTrophy("shadow");
        // alert("🎉 Du løste Skygge hulens mysterie!");
        const audio = new Audio(`/stemmer/skygge-hulen-${selectedCharacter}.mp3`);
        audio.play();
        audio.addEventListener("ended", () => {
            setTalkingStates({ filosofus: false, logon: false, luna: false });
        });
    });

    return (
        <div className={style.wrapper}>
            <div className={style.sceneBackground} />

            <div className={style.characterBox}>
                <CharacterTalker
                    baseName={selectedCharacter}
                    isTalking={false}
                    interval={150}
                    size={350}
                />
            </div>

            <DndProvider backend={HTML5Backend}>
                <PuzzleBoard
                    silhouette={silhouette}
                    dropZonePositions={dropZonePositions}
                    placedPieces={placedPieces}
                    pieceData={pieceData}
                    handleDrop={handleDrop}
                />
            </DndProvider>
        </div>
    );
}
