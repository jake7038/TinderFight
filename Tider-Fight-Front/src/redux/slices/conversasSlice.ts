import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit'
import { Conversas } from '../../tipos/conversasTipo'
import { RootState } from '../store'

const conversasAdapter = createEntityAdapter<Conversas, number>({
    selectId: (c) => c.id,
    sortComparer: (a, b) => b.date.getTime() - a.date.getTime()
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