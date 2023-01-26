import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TypeFactorBox, FactorType } from '../components/FactorBox'
import { TypeOptionBox } from '../components/OptionBox'


interface BoxesState {
    factors: TypeFactorBox[],
    options: TypeOptionBox[],
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

        addOption: (state, action: PayloadAction<TypeOptionBox>) => {
            state.options.push(action.payload)
        },

        changeFactorType: (state, action: PayloadAction<newFactorTypePayload>) => {
            state.factors.map(factor => factor.id === action.payload.id ? factor.type = action.payload.type : null)
        },

        changeFactorLabel: (state, action: PayloadAction<newFactorLabelPayload>) => {
            state.factors.map(factor => factor.id === action.payload.id ? factor.label = action.payload.label : null)
        },

        selectBox: (state, action: PayloadAction<selectBoxPayload>) => {
            if (action.payload.type === "factor") {
                state.factors.map(factor => factor.selected = action.payload.id === factor.id? true:false)
                state.options.map(option => option.selected = true)
            }
            if (action.payload.type === "option") {
                state.options.map(option => option.selected = action.payload.id === option.id? true:false)
                state.factors.map(factor => factor.selected = true)
            }
        }

        
    }
})

type selectBoxPayload = {
    id:number,
    type: "factor" | "option"
}

type newFactorTypePayload = {
    type: FactorType;
    id: number;
}

type newFactorLabelPayload = {
    label: string;
    id: number;
}

export const { addFactor, addOption, changeFactorType, changeFactorLabel, selectBox } = boxesSlice.actions
export default boxesSlice.reducer