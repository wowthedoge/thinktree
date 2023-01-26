import React, { useContext, useEffect, useRef, useState } from "react";
import "./styles.css";
import { useAppDispatch } from "../hooks";

interface Props {
  // id: number;
  id: number;
  type: string;
  labelChange?: (newLabel: string, id: number) => void;
}

const Box: React.FC<Props> = ({ id, type, labelChange }) => {
  const [value, setValue] = useState("");

  const onValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (labelChange) {
      labelChange(e.target.value, id);
    }
  };

  // const [contentEditable, setContentEditable] = useState<"true" | "false">(
  //   "false"
  // );
  // const boxRef = useRef<HTMLDivElement>(null);

  // const handleClick: () => void = () => {
  //   setContentEditable("true");
  //   boxRef.current?.classList.add("box__active");
  // };

  // useEffect(() => {
  //   const handleOutsideClicked: (e: MouseEvent) => void = (e) => {
  //     if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
  //       boxRef.current.blur();
  //       boxRef.current.classList.remove("box__active");
  //       setContentEditable("false");
  //     }
  //   };
  //   document.addEventListener("mousedown", handleOutsideClicked);
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClicked);
  //   };
  // }, [boxRef]);

  return (
    <textarea
      className="box"
      value={value}
      onChange={(e) => onValueChange(e)}
    ></textarea>
  );
};

export default Box;
