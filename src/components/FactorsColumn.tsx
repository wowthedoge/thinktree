import React, { FormEvent, useContext, useState } from "react";
import Box from "./Box";
import { ArcherElement } from "react-archer";
import { RelationType } from "react-archer/lib/types";
import { useAppSelector, useAppDispatch } from "../hooks";
import { addFactor, changeFactorType } from "../features/boxesSlice";
import {
  addConnection,
  modifyConnection,
} from "../features/connectionsSlice";
import { Connection } from "../features/connectionsSlice";

export type FactorBoxType = "Higher is better" | "Lower is better" | "Yes/No";

export type FactorBox = {
  id: number;
  type: FactorBoxType;
};

const FactorsColumn: React.FC = () => {
  const factors = useAppSelector((state) => state.boxes.factors);
  const options = useAppSelector((state) => state.boxes.options);
  const dispatch = useAppDispatch();
  const connections = useAppSelector((state) => state.connections);

  const addFactorButtonClicked = () => {
    const newFactorId = factors.length + 1;
    //add a factor
    dispatch(addFactor({ id: newFactorId, type: "Higher is better" }));
    //add connections from that factor to all options
    options.map((option) =>
      dispatch(
        addConnection({
          from: newFactorId,
          to: option,
          value: 0,
          type: "Higher is better",
        })
      )
    );
  };

  const onFactorTypeChanged = (newType: FactorBoxType, id: number) => {
    dispatch(
      changeFactorType({
        id: id,
        type: newType,
      })
    );
    // all connections from this changed Factor
    connections.filter(connection => connection.from === id).map(
      connection => dispatch(
        modifyConnection({
          ...connection,
          type: newType
        })
      )
    )
  };

  const archerRelationsList: (
    color: string,
    factor: Number
  ) => RelationType[] = (color, factor) =>
    // For drawing the connections
    connections
      .filter((connection) => connection.from === factor)
      .map((connection) => ({
        targetId: "option" + connection.to.toString(),
        targetAnchor: "left",
        sourceAnchor: "right",
        style: { strokeColor: color, strokeWidth: 4 },
        label: <Value connection={connection} color="white" />,
      }));

  return (
    <div className="column">
      {factors.map((factor) => (
        <div>
          <ArcherElement
            id={"factor" + factor.id}
            relations={archerRelationsList("grey", factor.id)}
          >
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
          <select
            onChange={(e) =>
              onFactorTypeChanged(e.target.value as FactorBoxType, factor.id)
            }
          >
            <option>Higher is better</option>
            <option>Lower is better</option>
            <option>Yes/No</option>
          </select>
        </div>
      ))}

      <button className="add-box-button" onClick={addFactorButtonClicked}>
        +
      </button>
    </div>
  );
};

const Value = (Props: { connection: Connection; color: string }) => {
  const [value, setValue] = useState<number | string>(
    Props.connection.value.toString()
  );
  const dispatch = useAppDispatch();

  const updateValue = (val: string, e: FormEvent<HTMLInputElement>) => {
    e && e.preventDefault();
    setValue(val);
    console.log(val);
    dispatch(
      modifyConnection({
        ...Props.connection,
        value: Number(val),
      })
    );
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
