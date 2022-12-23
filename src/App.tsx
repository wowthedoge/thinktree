import { useRef, useState } from "react";
import "./App.css";
import DependsColumn from "./components/DependsColumn";
import { ArcherContainer } from "react-archer";
import OptionsColumn from "./components/OptionsColumn";
import Box from "./components/Box";

const App: React.FC = () => {
  const selectedBox: React.MutableRefObject<[number, number]> = useRef([
    -1, -1,
  ]);

  const [data, setData] = useState<number[][]>([[1]]);
  const optionsRefsList = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const dependsRefsList = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const [optionsNbList, setOptionsNbList] = useState<number[]>([])

  const getOptionsRefsList: (
    refsList: React.RefObject<HTMLDivElement>[]
  ) => void = (refsList) => {
    optionsRefsList.current = refsList;
  };

  const getDependsRefsList: (
    refsList: React.RefObject<HTMLDivElement>[]
  ) => void = (refsList) => {
    dependsRefsList.current = refsList;
  };

  const getOptionsNbList:(nbList:number[]) => void = (nbList) =>
  {
    setOptionsNbList(nbList)
  }

  return (
    <div className="App">
      <ArcherContainer 
        style={{ height: "100%", width: "100%" }}
        lineStyle="curve"
        endMarker={false}
      >
        <main>
          <DependsColumn getRefsList={getDependsRefsList} optionsList={optionsNbList}/>
          <OptionsColumn getRefsList={getOptionsRefsList} getNbList={getOptionsNbList}/>
        </main>
      </ArcherContainer>
    </div>
  );
};

export default App;
