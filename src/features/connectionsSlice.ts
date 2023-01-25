import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FactorBox, OptionBox } from "../components/Box";

export type Connection = {
    from: string,
    to: string,
    value: number,
}

const initialState: Connection[] = []

export const connectionsSlice = createSlice({
    name: "connections",
    initialState,
    reducers: {
        addConnection: (state, action: PayloadAction<Connection>) => {
            state.push(action.payload)
        },
        changeConnectionValue: (state, action: PayloadAction<Connection>) => {
            state.map(connection =>
                connection.from === action.payload.from && connection.to === action.payload.to ?
                connection.value = action.payload.value : null
            )
        }
    },
})

export const { addConnection, changeConnectionValue } = connectionsSlice.actions
export default connectionsSlice.reducer