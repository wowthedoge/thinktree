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

const OptionsColumn: React.FC = () => {
  const options = useAppSelector((state) => state.boxes.options);
  const factors = useAppSelector((state) => state.boxes.factors);
  const dispatch = useAppDispatch();
  const connections = useAppSelector((state) => state.connections);

  const addOptionButtonClicked = () => {
    const newOptionId = options.length + 1;
    //add an option
    dispatch(addOption(newOptionId));
    //add connections from that option to all factors
    factors.map((factor) =>
      dispatch(
        addConnection({
          from: factor.id,
          to: newOptionId,
          value: 0,
          type: factor.type,
        })
      )
    );
  };

  const getDisplay = (optionId:number) => {
    const connsForOption = connections.filter(c => c.to === optionId)
    const lowerBetter = connsForOption.find(c => c.type==="Lower is better")
    const higherBetter = connsForOption.find(c => c.type==="Higher is better")
    return `${Math.round(higherBetter!.value*100/lowerBetter!.value)/100}`
  }

  return (
    <div className="column options-column">
      {options.map((option) => (
        <div className="option-result-container">
          <ArcherElement id={"option" + option} key={"option" + option}>
            <div>
              <Box col={1} type="option" />
            </div>
          </ArcherElement>
          <ResultDisplay display={getDisplay(option)} />
        </div>
      ))}
      <button className="add-box-button" onClick={addOptionButtonClicked}>
        +
      </button>
    </div>
  );
};

const ResultDisplay = (Props: { display: string }) => {
  return <div className="result-display">{Props.display}</div>;
};

export default OptionsColumn;
