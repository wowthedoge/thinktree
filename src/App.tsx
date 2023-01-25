import { useCallback, useContext, useReducer, useRef, useState } from "react";
import "./App.css";
import FactorsColumn from "./components/FactorsColumn";
import { ArcherContainer } from "react-archer";
import OptionsColumn from "./components/OptionsColumn";
import Box from "./components/Box";
import React from "react";
// import { AppProvider, BoxStateContext } from "./AppContext";

const App: React.FC = () => {

  return (
      <div className="App">
        <ArcherContainer // for the links between boxes. See react-archer on npm
          style={{ height: "100%", width: "100%" }}
          lineStyle="curve"
          endMarker={false}
        >
          <main>
            <FactorsColumn />
            <OptionsColumn />
          </main>
        </ArcherContainer>
      </div>
  );
};

export default App;
