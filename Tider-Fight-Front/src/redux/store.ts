import { configureStore } from '@reduxjs/toolkit'
import lutadorReducer from './slices/lutadorSlice'

export const store = configureStore({
    reducer: {
        lutadores: lutadorReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch