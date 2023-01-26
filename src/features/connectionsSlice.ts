import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FactorType } from "../components/FactorBox";

export type Connection = {
    from: number,
    to: number,
    value: number,
    selected: boolean,
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
            const c = state.find(connection => connection.from === action.payload.from && connection.to === action.payload.to)
            c!.value = action.payload.value
        },
        selectConnectionsByBox: (state, action: PayloadAction<selectConnectionByBoxPayload>) => {
            state.map(connection => connection.selected = false)
            if (action.payload.type === "factor") {
                state.map(connection => connection.from === action.payload.id ? connection.selected = true : connection)
            }
            if (action.payload.type === "option") {
                state.map(connection => connection.to === action.payload.id ? connection.selected = true : connection)
            }
        }
    },
})

type selectConnectionByBoxPayload = {
    type: string,
    id: number,
}

export const { addConnection, changeConnectionValue, selectConnectionsByBox } = connectionsSlice.actions
export default connectionsSlice.reducer