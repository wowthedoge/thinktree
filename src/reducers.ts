// export enum Types {
//     AddOption = "ADD_OPTION",
//     AddFactor = "ADD_FACTOR",
//     AddConnection = "ADD_CONNECTION",
//     AddSplit = "ADD_SPLIT",
// }

// type ActionMap<M extends { [index: string]: any }> = {
//     [Key in keyof M]: M[Key] extends undefined
//     ? {
//         type: Key,
//     }
//     : {
//         type: Key,
//         payload: M[Key]
//     }
// }

// type BoxPayload = {
//     [Types.AddOption]: undefined
//     [Types.AddFactor]: undefined
//     [Types.AddSplit]: {
//         col: number
//         id: number
//     }
// }

// export type BoxActions = ActionMap<BoxPayload>[keyof ActionMap<BoxPayload>]



// export const boxReducer = (state: number[][], action: BoxActions) => {
//     switch (action.type) {
//         case Types.AddOption: {
//             return state.map((col: number[], i: number) => i === state.length - 1 ? [...col, col.length] : col)
//         }
//         case Types.AddFactor: {
//             return state.map((col: number[], i: number) => i === 0 ? [...col, col.length + 1] : col)
//         }
//         case Types.AddSplit:
//             {
//                 // // if need to add new column
//                 // if (action.payload.col === state.length - 2) {
//                 //     let newState = ([] as number[][])
//                 //         .concat(state.slice(0, action.payload.col + 1))
//                 //         .concat([[action.payload.id, action.payload.id]])
//                 //         .concat(state.slice(action.payload.col + 1))
//                 //     return newState
//                 // }
//                 // // add to existing column
//                 // else {
//                 //     return state.map((col: number[], i: number) => i === action.payload.col + 1
//                 //         ? [...col, action.payload.id, action.payload.id]
//                 //         : col)
//                 // }
//                 return [[1],[1],[1],[1]]

//             }


//         default: {
//             return [[5][5],[5],[5]]
//         }
            
//     }
// }

// export type ConnectionActions = ActionMap<ConnectionPayload>[keyof ActionMap<ConnectionPayload>]

// type ConnectionPayload = {
//     [Types.AddConnection]: {
//         from: React.RefObject<HTMLDivElement>
//         to: React.RefObject<HTMLDivElement>
//         value: number
//     }
// }

// type ConnectionType = {
//     from: React.RefObject<HTMLDivElement>
//     to: React.RefObject<HTMLDivElement>
//     value: number
// }

// export const connectionReducer = (state: ConnectionType[], action: ConnectionActions) => {
//     switch (action.type) {
//         case Types.AddConnection: {
//             return [...state, action.payload]
//         }
//         default:
//             return state
//     }
// }

const reducers = null;
export default reducers;