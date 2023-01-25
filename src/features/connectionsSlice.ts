import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FactorBoxType } from "../components/FactorsColumn";

export type Connection = {
    from: number,
    to: number,
    value: number,
    type: FactorBoxType,
    unit?: string,
}

const initialState: Connection[] = []

export const connectionsSlice = createSlice({
    name: "connections",
    initialState,
    reducers: {
        addConnection: (state, action: PayloadAction<Connection>) => {
            state.push(action.payload)
        },
        modifyConnection: (state, action: PayloadAction<Connection>) => {
        const c = state.find(connection => connection.from === action.payload.from && connection.to === action.payload.to)
        c!.type = action.payload.type
        c!.value = action.payload.value
        },
    },
})

export const { addConnection, modifyConnection } = connectionsSlice.actions
export default connectionsSlice.reducer