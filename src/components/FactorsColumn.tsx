import React, { FormEvent, useContext, useState } from "react";
import Box from "./Box";
import { ArcherElement } from "react-archer";
import { RelationType } from "react-archer/lib/types";
import { useAppSelector, useAppDispatch } from "../hooks";
import { addFactor } from "../features/boxesSlice";
import { addConnection, changeConnectionValue } from "../features/connectionsSlice"
import { Connection } from "../features/connectionsSlice"

const FactorsColumn: React.FC = () => {
  const factors = useAppSelector((state) => state.boxes.factors);
  const options = useAppSelector((state) => state.boxes.options);
  const dispatch = useAppDispatch();
  const connections = useAppSelector(state => state.connections)

  let colorList: string[] = [
    "rgba(206, 129, 121)",
    "rgba(220, 163, 130)",
    "rgba(209, 199, 136)",
    "rgba(143, 185, 140)",
    "rgba(134, 157, 178)",
    "rgba(166, 130, 159)",
  ];
  // const colorPicker: (number: number, opacity: number) => string = (
  //   number,
  //   opacity
  // ) =>
  //   colorList[(number - 1) % (colorList.length - 1)].replace(
  //     ")",
  //     `,${opacity})`
  //   );

  const addFactorButtonClicked = () => {
    const newFactor = factors.length+1
    //add a factor
    dispatch(addFactor(newFactor))
    //add connections from that factor to all options
    options.map(option => dispatch(addConnection({
      from:"factor"+newFactor,
      to:"option"+option,
      value:0,
    })))
  }

  const archerRelationsList: (color: string, factor:Number) => RelationType[] = (color, factor) => 
    // For drawing the connections
    connections.filter(connection => connection.from === "factor" + factor)
    .map(connection => ({
      targetId: connection.to,
      targetAnchor: "left",
      sourceAnchor: "right",
      style: { strokeColor: color, strokeWidth: 4 },
      label: <Value connection={connection} color="white"/>,
    }))



  return (
    <div className="column">
      {factors.map((factor) => (
        <ArcherElement id={"factor" + factor} 
        relations={archerRelationsList("grey", factor)}>
          <div
            style={{
              borderRadius: "10px",
              // backgroundColor: colorPicker(d, d === selectedId ? 1 : 0.3),
              backgroundColor: "white",
            }}
          >
            <Box col={0} type="factor" />
          </div>
        </ArcherElement>
      ))}

      <button
        className="add-box-button"
        onClick={addFactorButtonClicked}
      >
        +
      </button>
    </div>
  );
};

const Value = (Props: { connection:Connection, color: string }) => {
  const [value, setValue] = useState<number | string>(Props.connection.value.toString());
  const dispatch = useAppDispatch();

  const updateValue = (val: string, e: FormEvent<HTMLInputElement>) => {
    e && e.preventDefault();
    setValue(val);
    console.log(val)
    dispatch(changeConnectionValue({
      ...Props.connection,
      value:Number(val)
    }))
  };

  return (
    //backgroundColor: Props.color, borderRadius:"1rem"
    <div style={{ marginTop: "-35px" }}>
      <input
        style={{ color: Props.color }}
        className="value"
        onFocus={(e) => {
          if (Number((e.target as HTMLInputElement).value === "0"))
            updateValue("", e);
        }}
        value={value}
        onChange={(e) =>
          updateValue(
            Number((e.target as HTMLInputElement).value).toString(),
            e
          )
        }
        type="number"
        inputMode="numeric"
      />
    </div>
  );
};

export default FactorsColumn;
