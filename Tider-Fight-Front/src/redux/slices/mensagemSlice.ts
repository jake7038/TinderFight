import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { Mensagem } from '../../tipos/mensagemTipo'
import { RootState } from '../store'
import { getMensagens, criarMensagem, deletarMensagem , editarMensagem } from '../requisicoes/mensagemThunk'

const mensagensAdapter = createEntityAdapter<Mensagem, string>({
    selectId: (m: Mensagem) => m.id,
    sortComparer: (a, b) => a.time.getTime() - b.time.getTime()
})

const initialState = mensagensAdapter.getInitialState()

const mensagensSlice = createSlice({
    name: 'mensagens',
    initialState,
    reducers: {
        setMensagens: mensagensAdapter.setAll,
        adicionarMensagem: mensagensAdapter.addOne,
        adicionarMensagens: mensagensAdapter.addMany,
        atualizarMensagem: mensagensAdapter.updateOne,
        removerMensagem: mensagensAdapter.removeOne
    },
    extraReducers: (builder) => {
    builder
        .addCase(getMensagens.fulfilled, (state, action) => {
            mensagensAdapter.setAll(state, action.payload)
        })
        .addCase(criarMensagem.fulfilled, (state, action) => {
            mensagensAdapter.addOne(state, action.payload)
        })
        .addCase(editarMensagem.fulfilled, (state, action) => {
            mensagensAdapter.upsertOne(state, action.payload)
        })
        .addCase(deletarMensagem.fulfilled, (state, action) => {
            mensagensAdapter.removeOne(state, action.payload)
        })
}
})

export const {
    setMensagens,
    adicionarMensagem,
    adicionarMensagens,
    atualizarMensagem,
    removerMensagem
} = mensagensSlice.actions

export const mensagensSelectors = mensagensAdapter.getSelectors(
    (state: RootState) => state.mensagens
)

export default mensagensSlice.reducer