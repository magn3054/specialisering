import { useEffect, useState } from "react";

export default function CharacterTalker({
  baseName, // fx. "filosofus"
  isTalking = false,
  interval = 150,
  // size = 10,
  path = "/src/assets/"
}) {
  const [showOpen, setShowOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (isTalking) {
      timer = setInterval(() => {
        setShowOpen(prev => !prev);
      }, interval);
    } else {
      setShowOpen(false);
    }
    return () => clearInterval(timer);
  }, [isTalking, interval]);

  const imageSrc = `${path}${baseName}-${showOpen ? "open" : "closed"}.svg`;

  return (
    <img
      src={imageSrc}
      alt={`${baseName} talking`}
      width={"100%"}
      height={"100%"}
      style={{
        transition: "0.1s ease-in-out",
        filter: "drop-shadow(1px 5px 2px rgba(0,0,0,0.75))",
      }}
    />
  );
}



// const handleTalk = (name, duration = 3) => {
//     setTalkingStates(prev => ({
//         ...prev,
//         [name]: true
//     }));

//     setTimeout(() => {
//         setTalkingStates(prev => ({
//             ...prev,
//             [name]: false
//         }));
//     }, duration * 1000);
// };


