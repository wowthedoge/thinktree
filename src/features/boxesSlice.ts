import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TypeFactorBox, FactorBoxType } from '../components/FactorBox'


interface BoxesState {
    factors: TypeFactorBox[],
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
        addFactor: (state, action: PayloadAction<TypeFactorBox>) => {
            state.factors.push(action.payload)
        },

        addOption: (state, action: PayloadAction<number>) => {
            state.options.push(action.payload)
        },

        changeFactorType: (state, action: PayloadAction<newFactorTypePayload>) => {
            state.factors.map(factor => factor.id === action.payload.id ? factor.type = action.payload.type : null)
        },

        changeFactorLabel: (state, action: PayloadAction<newFactorLabelPayload>) => {
            state.factors.map(factor => factor.id === action.payload.id ? factor.label = action.payload.label : null)
        }
    }
})

type newFactorTypePayload = {
    type: FactorBoxType;
    id: number;
}

type newFactorLabelPayload = {
    label: string;
    id: number;
}

export const { addFactor, addOption, changeFactorType, changeFactorLabel } = boxesSlice.actions
export default boxesSlice.reducer