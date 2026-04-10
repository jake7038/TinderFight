import { configureStore } from '@reduxjs/toolkit'
import lutadorReducer from './slices/lutadorSlice'
import ususarioReducer from './slices/usuarioSlice'
import conversasReducer from './slices/conversasSlice'
import mensagemReducer from './slices/mensagemSlice'

export const store = configureStore({
    reducer: {
        lutadores: lutadorReducer,
        usuario: ususarioReducer,
        conversas: conversasReducer,
        mensagens: mensagemReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch