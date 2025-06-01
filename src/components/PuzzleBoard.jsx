import PuzzleShadow from "./PuzzleShadow";
import PuzzlePiece from "./PuzzlePiece";

export default function PuzzleBoard({ silhouette, dropZonePositions, placedPieces, pieceData, handleDrop }) {
    return (
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
                const pieceId = placedPieces[shadowId]; // Hvilken brik er placeret her?
                const piece = pieceData.find(p => p.id === pieceId);
                const pieceSize = pieceData[i];

                return (
                    <PuzzleShadow
                        key={i}
                        id={shadowId}
                        onDrop={handleDrop}
                        position={pos}
                        width={pieceSize?.width || 60}
                        height={pieceSize?.height || 60}
                    >
                        {/* Hvis der er en brik placeret her, vis den */}
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

            {/* Drop zone til at returnere puslespilsbrikker */}
            <PuzzleShadow
                id="source"
                onDrop={handleDrop}
                position={{ x: 0, y: 0 }}
            />

            {/* Render puslespilsbrikker, som ikke er placeret endnu */}
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
    );
}
