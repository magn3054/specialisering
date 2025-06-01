import { useEffect, useState } from "react";
import filosofusOpen from "../assets/filosofus-open.svg";
import filosofusClosed from "../assets/filosofus-closed.svg";
import lunaOpen from "../assets/luna-open.svg";
import lunaClosed from "../assets/luna-closed.svg";
import logonOpen from "../assets/logon-open.svg";
import logonClosed from "../assets/logon-closed.svg";

// Objekt der matcher karakter-navne til åbne og lukkede mund-ikoner
const characterImages = {
  filosofus: {
    open: filosofusOpen,
    closed: filosofusClosed,
  },
  luna: {
    open: lunaOpen,
    closed: lunaClosed,
  },
  logon: {
    open: logonOpen,
    closed: logonClosed,
  },
};

export default function CharacterTalker({
  baseName, // fx. "filosofus"
  isTalking = false,
  interval = 150,
}) {
  const [showOpen, setShowOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (isTalking) { 
      // Skifter mellem åbent/lukket mund-ikon med et interval for at animere tale
      timer = setInterval(() => {
        setShowOpen(prev => !prev);
      }, interval);
    } else {
      // Hvis karakteren ikke taler, vis lukket mund
      setShowOpen(false);
    }
    return () => clearInterval(timer);
  }, [isTalking, interval]);

  // Vælg det korrekte billede ud fra om munden skal være åben eller lukket
  const talkerSrc = characterImages[baseName]?.[showOpen ? "open" : "closed"];

  return (
    <img
      src={talkerSrc}
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
