import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { addFactor } from "../features/boxesSlice";
import {
  addConnection,
} from "../features/connectionsSlice";
import FactorBox from "./FactorBox";



const FactorsColumn: React.FC = () => {
  const factors = useAppSelector((state) => state.boxes.factors);
  const options = useAppSelector((state) => state.boxes.options);
  const dispatch = useAppDispatch();

  const addFactorButtonClicked = () => {
    const newFactorId = factors.length + 1;
    //add a factor
    dispatch(addFactor({ id: newFactorId, type: "Higher is better", label:"", selected: false}));
    //add connections from that factor to all options
    options.map((option) =>
      dispatch(
        addConnection({
          from: newFactorId,
          to: option.id,
          value: 0,
          selected: false,
        })
      )
    );
  };

  



  return (
    <div className="column">
      {factors.map((factor) => (
        <FactorBox factor={factor} />
      ))}

      <button className="add-box-button" onClick={addFactorButtonClicked}>
        +
      </button>
    </div>
  );
};



export default FactorsColumn;
