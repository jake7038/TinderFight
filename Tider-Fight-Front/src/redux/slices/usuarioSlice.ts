import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Usuario } from '../../tipos/usuarioTipo'

const initialState: Usuario | null = null

const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: initialState as Usuario | null,
    reducers: {
        setUsuario: (state, action: PayloadAction<Usuario>) => {
        return action.payload
        },

        alterarUsuario: (state, action: PayloadAction<Partial<Usuario>>) => {
        if (state) {
            Object.assign(state, action.payload)
        }
        },

        logout: () => {
        return null
        }
    }
})

export const { setUsuario, alterarUsuario, logout } = usuarioSlice.actions
export default usuarioSlice.reducer