import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { Lutador } from '../../tipos/lutadorTipo'
import { RootState } from '../store'
import { fetchLutadores, criarLutador, atualizarLutador, deletarLutador } from '../requisicoes/lutadorThunk'

const lutadoresAdapter = createEntityAdapter<Lutador, string>({
    selectId: (lutador) =>  lutador.id
})

const initialState = lutadoresAdapter.getInitialState()

const lutadorSlice = createSlice({
    name: 'lutadores',
    initialState,
    reducers: {
        setLutadores: lutadoresAdapter.setAll,
        adicionarLutador: lutadoresAdapter.addOne,
        removerLutador: lutadoresAdapter.removeOne
    },
    extraReducers: (builder) => {
    builder

    .addCase(fetchLutadores.fulfilled, (state, action) => {
        lutadoresAdapter.setAll(state, action.payload)
    })

    .addCase(criarLutador.fulfilled, (state, action) => {
        lutadoresAdapter.addOne(state, action.payload)
    })

    .addCase(atualizarLutador.fulfilled, (state, action) => {
        lutadoresAdapter.upsertOne(state, action.payload)
    })

    .addCase(deletarLutador.fulfilled, (state, action) => {
        lutadoresAdapter.removeOne(state, action.payload)
    })
}
})

export const lutadoresSelectors = lutadoresAdapter.getSelectors((state: RootState) => state.lutadores)

export const {setLutadores, adicionarLutador, removerLutador } = lutadorSlice.actions

export default lutadorSlice.reducer