import { useDrop } from "react-dnd";

export default function PuzzleShadow({ id, onDrop, position, children, width = 60 }) {
    // Hook til at gøre element til drop zone
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: "puzzlePiece",  // Accepterer draggable objekter af type puzzlePiece
        drop: (item) => {
            onDrop(item.id, id); // Kalder callback med puslespilsbrik id og drop zone id
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),   // Om elementet aktuelt bliver hovered med draggable
            canDrop: monitor.canDrop(), // Om det draggable objekt kan droppes her
        }),
    }), [id, onDrop]);

    return (
        <div
            ref={drop}
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                width: width,
                height: "10%",
                borderRadius: "10px",
                // Ændrer baggrundsfarve ved drag-over og om drop er muligt
                backgroundColor: isOver && canDrop ? "rgba(0, 255, 0, 0.3)" : "rgba(0, 255, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
            }}
        >
            {children}
        </div>
    );
}
