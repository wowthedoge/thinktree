import { configureStore } from '@reduxjs/toolkit'
import boxesReducer from './features/boxesSlice'
import connectionsReducer from './features/connectionsSlice'

const store = configureStore({
    reducer: {
        boxes: boxesReducer,
        connections: connectionsReducer,
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
