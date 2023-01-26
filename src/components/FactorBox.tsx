import React, { FormEvent, useState } from "react";
import { ArcherElement } from "react-archer";
import Box from "./Box";
import { changeFactorLabel, changeFactorType } from "../features/boxesSlice";
import { Connection, modifyConnection } from "../features/connectionsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RelationType } from "react-archer/lib/types";

interface Props {
  factor: TypeFactorBox;
}

export type FactorBoxType = "Higher is better" | "Lower is better" | "Yes/No";

export type TypeFactorBox = {
  id: number;
  type: FactorBoxType;
  label: string;
};

const FactorBox: React.FC<Props> = ({ factor }) => {

  const dispatch = useAppDispatch();
  const connections = useAppSelector((state) => state.connections);

  const onFactorTypeChanged = (newType: FactorBoxType, id: number) => {
    dispatch(
      changeFactorType({
        id: id,
        type: newType,
      })
    );
    // all connections from this changed Factor
    connections
      .filter((connection) => connection.from === id)
      .map((connection) =>
        dispatch(
          modifyConnection({
            ...connection,
            type: newType,
          })
        )
      );
  };

  const onFactorLabelChanged = (newLabel: string, id: number) => {
    dispatch(
      changeFactorLabel({
        label: newLabel,
        id: id,
      })
    );
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
          <Box
            id={factor.id}
            type="factor"
            labelChange={onFactorLabelChanged}
          />
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

export default FactorBox;
