import { useDrag } from "react-dnd";

export default function PuzzlePiece({ id, image, alt, position, width=60, isInDropZone = false }) {
    // Hook til at gøre element draggable (kan trækkes)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "puzzlePiece",     // Type af draggable objekt
        item: { id },            // Data som sendes ved drag start
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(), // State for om elementet trækkes
        }),
    }));

    // Stil til puslespilsbrikken
    const style = {
        position: "absolute",
        // Hvis brikken er placeret i en drop zone, positioneres den ikke via left/top
        left: isInDropZone ? undefined : position.x,
        top: isInDropZone ? undefined : position.y,
        opacity: isDragging ? 0.5 : 1,  // Gør brikken gennemsigtig under drag
        cursor: "grab",
        width: width,
        pointerEvents: isDragging ? "none" : "auto", // Forhindrer "ghosting" under drag
    };

    return <img ref={drag} src={image} alt={alt} style={style} />;
}
