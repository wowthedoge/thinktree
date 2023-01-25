import React, { useContext, useEffect, useRef, useState } from "react";
import "./styles.css";

// const FactorTypes = {
//   HIGHER_BETTER,
//   LOWER_BETTER,
//   YESNO,
// }

export type OptionBox = {
}

export type FactorBox = {

}

interface Props {
  // id: number;
  col: number;
  type: string;
}

const Box: React.FC<Props> = ({ col, type }) => {


  const [contentEditable, setContentEditable] = useState<"true" | "false">(
    "false"
  );
  const boxRef = useRef<HTMLDivElement>(null);

  const handleClick: () => void = () => {
    setContentEditable("true");
    boxRef.current?.classList.add("box__active");
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


  return (
    <div className="box" onClick={handleClick} ref={boxRef}>
      <span
        className="textarea"
        role="textbox"
        contentEditable={contentEditable}
      ></span>
      {/* {type === "factor" && (
        <button className="add-split-button" onClick={()=>{}}>
          +
        </button>
      )} */}
    </div>
  );
};

export default Box;
