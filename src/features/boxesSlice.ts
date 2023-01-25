import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface BoxesState {
    factors: Number[],
    options: Number[],
}

const initialState: BoxesState = {
    factors: [],
    options: []
}

export const boxesSlice = createSlice({
    name: 'boxes',
    initialState,
    reducers: {
        addFactor: (state, action: PayloadAction<Number>) => {
            state.factors.push(action.payload)
        },

        addOption: (state, action: PayloadAction<Number>) => {
            state.options.push(action.payload)
        }
    }
})

export const { addFactor, addOption } = boxesSlice.actions
export default boxesSlice.reducer