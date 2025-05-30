import { useDrop } from "react-dnd";

export default function PuzzleShadow({ id, onDrop, position, children }) {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: "puzzlePiece",
        drop: (item) => {
            onDrop(item.id, id);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [id, onDrop]);

    return (
        <div
            ref={drop}
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                width: 60,
                height: 60,
                borderRadius: "10px",
                backgroundColor: isOver && canDrop ? "rgba(0, 255, 0, 0.3)" : "transparent",
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
