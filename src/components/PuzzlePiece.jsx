import { useDrag } from "react-dnd";

export default function PuzzlePiece({ id, image, alt, position, widthStart=60, isInDropZone = false }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "puzzlePiece",
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const style = {
        position: "absolute",
        left: isInDropZone ? undefined : position.x,
        top: isInDropZone ? undefined : position.y,
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        // width: `${width}px`,
        width: widthStart,
        height: "100%",
        pointerEvents: isDragging ? "none" : "auto", // prevents ghosting
    };

    return <img ref={drag} src={image} alt={alt} style={style} />;
}
