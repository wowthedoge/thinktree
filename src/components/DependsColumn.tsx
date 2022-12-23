import React, { useEffect, useRef, useState } from "react";
import Box from "./Box";
import { ArcherElement } from "react-archer";
import { RelationType } from "react-archer/lib/types";

interface Props {
  getRefsList: (refsList: React.RefObject<HTMLDivElement>[]) => void;
  optionsList: number[];
}

const DependsColumn: React.FC<Props> = ({ getRefsList, optionsList }) => {
  const refsSet = useRef<Set<React.RefObject<HTMLDivElement>>>(new Set());
  const [dependList, setDependList] = useState<number[]>([]);

  const addRef: (ref: React.RefObject<HTMLDivElement>) => void = (ref) => {
    refsSet.current.add(ref);
  };

  const colorList: string[] = [
    "#CE8179",
    "#DCA382",
    "#D1C788",
    "#8FB98C",
    "#869DB2",
    "#A6829F",
  ];

  useEffect(
    () => getRefsList(Array.from(refsSet.current.values())),
    [refsSet, getRefsList]
  );

  const archerRelationsList: (color: string) => RelationType[] = (color) =>
    optionsList.map((o) => ({
      targetId: "option" + o,
      targetAnchor: "left",
      sourceAnchor: "right",
      style: { strokeColor: color, strokeWidth: 2 },
      label: <div style={{ marginTop: "-30px", color: color }}> a </div>,
    }));

  const addDepend = () => {
    setDependList([...dependList, dependList.length + 1]);
  };

  return (
    <div className="column">
      {dependList.map((d) => (
        <ArcherElement
          key={"depend" + d}
          id={"depend" + d}
          relations={archerRelationsList(
            colorList[(d - 1) % (colorList.length - 1)]
          )}
        >
          <div
            style={{
              backgroundColor: colorList[(d - 1) % (colorList.length - 1)],
            }}
          >
            <Box addRef={addRef} />
          </div>
        </ArcherElement>
      ))}

      <button className="options-button" onClick={addDepend}>
        +
      </button>
    </div>
  );
};

export default DependsColumn;
