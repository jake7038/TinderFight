import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Usuario } from '../../tipos/usuarioTipo'
import { fetchUsuario, criarUsuario, deletarUsuario, atualizarUsuario  } from '../requisicoes/usuarioThunk'


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
    },
    extraReducers: (builder) => {
        builder

        .addCase(fetchUsuario.fulfilled, (state, action) => {
            return action.payload
        })

        .addCase(criarUsuario.fulfilled, (state, action) => {
            return action.payload
        })

        .addCase(deletarUsuario.fulfilled, (state, action) => {
            return null
        })

        .addCase(atualizarUsuario.fulfilled, (state, action) => {
        return action.payload
        })

    }

})

export const { setUsuario, alterarUsuario, logout } = usuarioSlice.actions
export default usuarioSlice.reducer