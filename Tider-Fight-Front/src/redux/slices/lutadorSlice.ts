import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    lutador: {
        nome: "Charles do Bronx",
        cidade: "Guarujá",
        estado: "SP",
        modalidade: ['Jiu Jitsu', 'MMA']
    }
}

const lutadorSlice = createSlice({
    name: 'lutador',
    initialState,
    reducers: {
        alterarLutador: (state, action) => {
            state.lutador = action.payload
        },
        atualizarNome: (state, action) => {
            state.lutador.nome = action.payload
        }
    }
})

export const { alterarLutador, atualizarNome } = lutadorSlice.actions

export default lutadorSlice.reducer