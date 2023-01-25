import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Box from "./Box";
import { ArcherElement } from "react-archer";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addOption } from "../features/boxesSlice";
import { addConnection } from "../features/connectionsSlice";
import { number } from "echarts";

const OptionsColumn: React.FC = () => {
  const options = useAppSelector((state) => state.boxes.options);
  const factors = useAppSelector((state) => state.boxes.factors);
  const dispatch = useAppDispatch();
  const connections = useAppSelector((state) => state.connections);

  const addOptionButtonClicked = () => {
    const newOption = options.length + 1;
    //add an option
    dispatch(addOption(newOption));
    //add connections from that option to all factors
    factors.map((factor) =>
      dispatch(
        addConnection({
          from: "factor" + factor,
          to: "option" + newOption,
          value: 0,
        })
      )
    );
  };

  return (
    <div className="column options-column">
      {options.map((option) => (
        <div className="option-result-container">
          <ArcherElement id={"option" + option} key={"option" + option}>
            <div>
              <Box col={1} type="option" />
            </div>
          </ArcherElement>
          <ResultDisplay
            total={connections.reduce(
              (total, connection) =>
                connection.to === "option" + option
                  ? connection.value + total
                  : total,
              0
            )}
          />
        </div>
      ))}
      <button className="add-box-button" onClick={addOptionButtonClicked}>
        +
      </button>
    </div>
  );
};

const ResultDisplay = (Props: { total: Number }) => {
  return <div className="result-display">{Props.total as ReactNode}</div>;
};

export default OptionsColumn;
