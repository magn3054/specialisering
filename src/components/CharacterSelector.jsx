import CharacterTalker from "./CharacterTalker";
import characterStyles from "./CharacterStyles.module.css";

export default function CharacterSelector({
    name,
    isSelected,
    isTalking,
    isShrinking,
    onSelect
}) {
    return (
        <div
            // Dynamisk sammensat CSS-klasse baseret på props (f.eks. valgt og formindsket tilstand)
            className={`
                ${characterStyles[name]} 
                ${isSelected ? characterStyles.selected : ""} 
                ${isShrinking && isSelected ? characterStyles.shrink : ""}
            `}
            onClick={() => onSelect(name)} // Kalder onSelect med karakterens navn ved klik
        >
            <CharacterTalker
                baseName={name}
                isTalking={isTalking}
                interval={150}
                size={350}
            />
        </div>
    );
}
