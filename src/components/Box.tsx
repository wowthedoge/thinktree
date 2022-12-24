import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

export interface BoxI {
  ref: React.RefObject<HTMLDivElement>;
}

interface Props {
  id: number;
  type: string;
  addRef: (ref: React.RefObject<HTMLDivElement>) => void;
  boxClicked: (id: number) => void;
  addChild?: () => void;
}

const Box: React.FC<Props> = ({ id, type, addRef, boxClicked, addChild }) => {
  const [contentEditable, setContentEditable] = useState<"true" | "false">(
    "false"
  );
  const boxRef = useRef<HTMLDivElement>(null);

  const handleClick: () => void = () => {
    setContentEditable("true");
    boxRef.current?.classList.add("box__active");
    boxClicked(id);
  };

  useEffect(() => {
    const handleOutsideClicked: (e: MouseEvent) => void = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        boxRef.current.blur();
        boxRef.current.classList.remove("box__active");
        setContentEditable("false");
      }
    };
    document.addEventListener("mousedown", handleOutsideClicked);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClicked);
    };
  }, [boxRef]);

  useEffect(() => {
    addRef(boxRef);
  }, [addRef, boxRef]);

  return (
    <div className="box" onClick={handleClick} ref={boxRef}>
      <span
        className="textarea"
        role="textbox"
        contentEditable={contentEditable}
      ></span>
      {type === "factor" && <button className="add-child-button" onClick={addChild}>+</button>}
    </div>
  );
};

export default Box;
