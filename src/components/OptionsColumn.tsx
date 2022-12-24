import React, { useEffect, useRef, useState } from "react";
import Box from "./Box";
import { ArcherElement } from "react-archer";

interface Props {
  getRefsList: (refsList: React.RefObject<HTMLDivElement>[]) => void;
  getNbList: (nbList: number[]) => void;
}

const OptionsColumn: React.FC<Props> = ({ getRefsList, getNbList }) => {
  const refsSet = useRef<Set<React.RefObject<HTMLDivElement>>>(new Set());

  const [optionsNbList, setOptionsNbList] = useState<number[]>([1, 2]);

  const addRef: (ref: React.RefObject<HTMLDivElement>) => void = (ref) => {
    refsSet.current.add(ref);
  };

  useEffect(() => getNbList(optionsNbList), [optionsNbList, getNbList]);

  useEffect(
    () => getRefsList(Array.from(refsSet.current.values())),
    [refsSet, getRefsList]
  );

  const addOption = () => {
    setOptionsNbList([...optionsNbList, optionsNbList.length + 1]);
  };

  const boxClicked = () => {};

  return (
    <div className="column options-column">
      {optionsNbList.map((n) => (
        <ArcherElement id={"option" + n} key={"option" + n}>
          <div>
            <Box id={n} type="option" addRef={addRef} boxClicked={boxClicked} />
          </div>
        </ArcherElement>
      ))}
      <button className="add-box-button" onClick={addOption}>+</button>
    </div>
  );
};

export default OptionsColumn;
