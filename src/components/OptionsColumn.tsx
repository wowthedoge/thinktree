import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addOption } from "../features/boxesSlice";
import { addConnection } from "../features/connectionsSlice";
import OptionBox from "./OptionBox";

const OptionsColumn: React.FC = () => {
  const options = useAppSelector((state) => state.boxes.options);
  const factors = useAppSelector((state) => state.boxes.factors);
  const dispatch = useAppDispatch();

  const addOptionButtonClicked = () => {
    const newOptionId = options.length + 1;
    //add an option
    dispatch(addOption({
      id: newOptionId,
      selected:false,
    }));
    //add connections from that option to all factors
    factors.map((factor) =>
      dispatch(
        addConnection({
          from: factor.id,
          to: newOptionId,
          value: 0,
          selected: false,
        })
      )
    );
  };

  return (
    <div className="column options-column">
      {options.map((option) => (
          <OptionBox option={option} />
      ))}
      <button className="add-box-button" onClick={addOptionButtonClicked}>
        +
      </button>
    </div>
  );
};

export default OptionsColumn;
