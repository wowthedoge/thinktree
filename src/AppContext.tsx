// import { Context, ReactNode, createContext, useContext, useReducer } from "react";
// import {
//   boxReducer,
//   connectionReducer,
//   BoxActions,
//   ConnectionActions,
// } from "./reducers";

// /*

// Box state example:

//   [
//     [1,2,3] - ids of Factors (first column is always Factors)
//     [1,1,3,3,3] - Splits. There are 5 Splits at this depth, 2 belonging to Factor 1, 3 belonging to Factor 3.
//     [2,2] - Splits. There are 2 Splits, both belonging to the second split of Factor 1.
//     [1,2] - ids of Options (last column is always Options)   
//   ]
//   Column ids start at 0
//   Box ids start at 1

// Connection state example:

// }

// */

// type ConnectionType = {
//   from: React.RefObject<HTMLDivElement>;
//   to: React.RefObject<HTMLDivElement>;
//   value: number;
// };
// const initialConnectionState: ConnectionType[] = [];
// const ConnectionContext = createContext<{
//   cState: ConnectionType[];
//   cDispatch: React.Dispatch<ConnectionActions>;
// }>({
//   cState: initialConnectionState,
//   cDispatch: () => null,
// });

// const initialBoxState: number[][] = [[], [1]];

// const BoxStateContext = createContext<number[][]>([[],[],[]]); //always this

// const BoxDispatchContext:Context<React.Dispatch<BoxActions>> = createContext<React.Dispatch<BoxActions>>(
//   () => null
// );


// const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [bState, bDispatch] = useReducer(boxReducer, initialBoxState);

//   return (
//     <BoxStateContext.Provider value={bState}>
//       <BoxDispatchContext.Provider value={bDispatch}>
//           {children}
//       </BoxDispatchContext.Provider>
//     </BoxStateContext.Provider>
//   );
// };

// const useConnectionContext = () => useContext(ConnectionContext);

// export { BoxStateContext, BoxDispatchContext, AppProvider };

// // const [cState, cDispatch] = useReducer(
// //   connectionReducer,
// //   initialConnectionState
// // );

const AppContext = null;
export default AppContext;