import { configureStore } from '@reduxjs/toolkit'
import lutadorReducer from './slices/lutadorSlice'

export const store = configureStore({
    reducer: {
        lutador: lutadorReducer
    }
})