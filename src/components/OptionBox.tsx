import React from "react";
import { ArcherElement } from "react-archer";
import { useAppSelector } from "../hooks";
import Box from "./Box";
import { Connection } from "../features/connectionsSlice";

interface Props {
  id: number;
}

const OptionBox: React.FC<Props> = ({ id }) => {
  const connections = useAppSelector((state) => state.connections);
  const factors = useAppSelector((state) => state.boxes.factors);

  const getDisplay = (optionId: number) => {
    const getFactor = (connection: Connection) =>
      factors.find((factor) => factor.id === connection.from);
    const connsForOption = connections.filter((c) => c.to === optionId);
    const lowerBetter = connsForOption.filter(
      (c) => getFactor(c)!.type === "Lower is better"
    );
    const higherBetter = connsForOption.filter(
      (c) => getFactor(c)!.type === "Higher is better"
    );

    // If only lowerisbetter
    if (lowerBetter.length === 0) {
      // make a list displaying the higherisbetters
      return higherBetter.reduce(
        (returnString, connection) =>
          returnString + getFactor(connection)!.label + ": " + connection.value + "\n",
        ""
      );
    
    // If only higherisbetter
    } else if (higherBetter.length === 0) {
        return lowerBetter.reduce(
            (returnString, connection) =>
              returnString + getFactor(connection)!.label + ": " + connection.value + "\n",
            ""
          );
    } else {
      return higherBetter.reduce(
        (returnString, connection) =>
          returnString +
          Math.round((connection.value * 100) / lowerBetter[0].value) / 100 +
          " " + getFactor(connection)?.label +"/" + getFactor(lowerBetter[0])?.label + "\n",
        ""
      );
    }
  };
  return (
    <div className="option-result-container">
      <ArcherElement id={"option" + id} key={"option" + id}>
        <div>
          <Box id={id} type="option" />
        </div>
      </ArcherElement>
      <ResultDisplay display={getDisplay(id)} />
    </div>
  );
};

const ResultDisplay = (Props: { display: string }) => {
  return <div className="result-display">{Props.display}</div>;
};

export default OptionBox;
