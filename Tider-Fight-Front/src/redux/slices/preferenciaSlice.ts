import { createSlice } from '@reduxjs/toolkit'
import { Preferencia } from '../../tipos/preferenciaTipo'
import { RootState } from '../store'
import { getPreferencias, criarPreferencia, atualizarPreferencia } from '../requisicoes/preferenciaThunk'

interface PreferenciaState {
    preferencia: Preferencia | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    erro: string | null
}

const initialState: PreferenciaState = {
    preferencia: null,
    status: 'idle',
    erro: null
}

const preferenciaSlice = createSlice({
    name: 'preferencias',
    initialState,
    reducers: {
        limparPreferencia: (state) => {
            state.preferencia = null
            state.status = 'idle'
            state.erro = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPreferencias.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getPreferencias.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.preferencia = action.payload
            })
            .addCase(getPreferencias.rejected, (state, action) => {
                state.status = 'failed'
                state.erro = action.payload ?? 'Erro desconhecido.'
            })

            .addCase(criarPreferencia.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(criarPreferencia.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.preferencia = action.payload
            })
            .addCase(criarPreferencia.rejected, (state, action) => {
                state.status = 'failed'
                state.erro = action.payload ?? 'Erro desconhecido.'
            })

            .addCase(atualizarPreferencia.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(atualizarPreferencia.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.preferencia = action.payload
            })
            .addCase(atualizarPreferencia.rejected, (state, action) => {
                state.status = 'failed'
                state.erro = action.payload ?? 'Erro desconhecido.'
            })
    }
})

export const { limparPreferencia } = preferenciaSlice.actions
export const selecionarPreferencia = (state: RootState) => state.preferencias.preferencia
export const selecionarStatusPreferencia = (state: RootState) => state.preferencias.status
export default preferenciaSlice.reducer