import React, { useContext, useEffect, useRef, useState } from "react";
import "./styles.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectConnectionsByBox } from "../features/connectionsSlice";
import { selectBox } from "../features/boxesSlice";

interface Props {
  // id: number;
  id: number;
  type: "factor" | "option";
  labelChange?: (newLabel: string, id: number) => void;
  selected: boolean;
}

const Box: React.FC<Props> = ({ id, type, labelChange, selected }) => {
  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();

  const onBoxClick = (e: React.MouseEvent) => {
    //select all connections to/from this box
    dispatch(
      selectConnectionsByBox({
        type: type,
        id: id,
      })
    );
    dispatch(
      selectBox({
        type: type,
        id: id,
      })
    );
  };

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
      onClick={(e) => onBoxClick(e)}
      style={selected ? { border: "4px solid teal" } : {}}
    ></textarea>
  );
};

export default Box;
