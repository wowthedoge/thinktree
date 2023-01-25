import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FactorBox } from '../components/FactorsColumn'


interface BoxesState {
    factors: FactorBox[],
    options: number[],
}



const initialState: BoxesState = {
    factors: [],
    options: []
}

export const boxesSlice = createSlice({
    name: 'boxes',
    initialState,
    reducers: {
        addFactor: (state, action: PayloadAction<FactorBox>) => {
            state.factors.push(action.payload)
        },

        addOption: (state, action: PayloadAction<number>) => {
            state.options.push(action.payload)
        },

        changeFactorType: (state, action: PayloadAction<FactorBox>) => {
            state.factors.map(factor => factor.id === action.payload.id ? factor.type = action.payload.type : null)
        }
    }
})

export const { addFactor, addOption, changeFactorType } = boxesSlice.actions
export default boxesSlice.reducer