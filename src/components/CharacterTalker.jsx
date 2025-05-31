import { useEffect, useState } from "react";
import filosofusOpen from "../assets/filosofus-open.svg";
import filosofusClosed from "../assets/filosofus-closed.svg";
import lunaOpen from "../assets/luna-open.svg";
import lunaClosed from "../assets/luna-closed.svg";
import logonOpen from "../assets/logon-open.svg";
import logonClosed from "../assets/logon-closed.svg";

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
      timer = setInterval(() => {
        setShowOpen(prev => !prev);
      }, interval);
    } else {
      setShowOpen(false);
    }
    return () => clearInterval(timer);
  }, [isTalking, interval]);

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
