import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit'
import { Conversas } from '../../tipos/conversasTipo'
import { RootState } from '../store'

const conversasAdapter = createEntityAdapter<Conversas, string>({
    selectId: (c) => c.id,
    sortComparer: (a, b) => b.date.getTime() - a.date.getTime()
})


const initialState = conversasAdapter.setAll(
    conversasAdapter.getInitialState(),
    [   
        {
            id: "1",
            usuarioId: "1",
            lastMessage: "vlw pai",
            matchId: "2",
            matchNome: "charle",
            date: new Date(),
            image: "./charles.png"
        },
        {
            id: "2",
            usuarioId: "1",
            lastMessage: "Vamo marcar sim!",
            matchId: "3",
            matchNome: "marcus",
            date: new Date(),
            image: "./charles.png"
        }
    ]
)

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