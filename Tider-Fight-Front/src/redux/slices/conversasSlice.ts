import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit'
import { Conversas } from '../../tipos/conversasTipo'
import { RootState } from '../store'
import { getConversas, criarConversa, deletarConversa } from '../requisicoes/conversasThunk'

const conversasAdapter = createEntityAdapter<Conversas, string>({
    selectId: (c) => c.id,
    sortComparer: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
})

const initialState = conversasAdapter.getInitialState()

const conversasSlice = createSlice({
    name: 'conversas',
    initialState,
    reducers: {
        setConversas: conversasAdapter.setAll,
        adicionarConversa: conversasAdapter.addOne,
        atualizarConversa: conversasAdapter.updateOne,
        removerConversa: conversasAdapter.removeOne
    },
    extraReducers: (builder) => {
    builder
        .addCase(getConversas.fulfilled, (state, action) => {
            conversasAdapter.setAll(state, action.payload)
        })
        .addCase(criarConversa.fulfilled, (state, action) => {
            conversasAdapter.addOne(state, action.payload)
        })
        .addCase(deletarConversa.fulfilled, (state, action) => {
            conversasAdapter.removeOne(state, action.payload)
        })
}
})

export const {
    setConversas,
    adicionarConversa,
    atualizarConversa,
    removerConversa
} = conversasSlice.actions

export const conversasSelectors = conversasAdapter.getSelectors(
    (state: RootState) => state.conversas
)

export default conversasSlice.reducer