import { useCallback, useRef, useState } from "react";
import "./App.css";
import FactorsColumn from "./components/FactorsColumn";
import { ArcherContainer } from "react-archer";
import OptionsColumn from "./components/OptionsColumn";
import Box from "./components/Box";
import ChildColumn from "./components/ChildColumn";

/*
how would the state be stored?
which state to be stored?
 - selectedBox
 - all columns and boxes
 - which addSplit box is called

all columns and boxes:
[
  [1,2,3] : Factors
  [2,3] : Splits - id of Box in last column doing the split
  [3] : Splits
  [1,2,3,4] : Options
]
 



*/


const App: React.FC = () => {
  const selectedBox: React.MutableRefObject<[number, number]> = useRef([
    -1, -1,
  ]);

  const optionsRefsList = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const factorsRefsList = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const [optionsNbList, setOptionsNbList] = useState<number[]>([]);
  const [factorsList, setFactorsList] = useState<number[]>([]);

  const getOptionsRefsList: (
    refsList: React.RefObject<HTMLDivElement>[]
  ) => void = (refsList) => {
    optionsRefsList.current = refsList;
  };

  const getFactorsRefsList: (
    refsList: React.RefObject<HTMLDivElement>[]
  ) => void = (refsList) => {
    factorsRefsList.current = refsList;
  };

  const getFactorsList: (newFactors: number[]) => void = (newFactors) => {
    setFactorsList(newFactors)
  };

  const getOptionsNbList: (nbList: number[]) => void = (nbList) => {
    setOptionsNbList(nbList);
  };

  return (
    <div className="App">
      <ArcherContainer
        style={{ height: "100%", width: "100%" }}
        lineStyle="curve"
        endMarker={false}
      >
        <main>
          <FactorsColumn
            getRefsList={getFactorsRefsList}
            optionsList={optionsNbList}
            getFactorsList={getFactorsList}
          />  
          {/* <ChildColumn factorsList={factorsList} /> */}
          <OptionsColumn
            getRefsList={getOptionsRefsList}
            getNbList={getOptionsNbList}
          />
        </main>
      </ArcherContainer>
    </div>
  );
};

export default App;
