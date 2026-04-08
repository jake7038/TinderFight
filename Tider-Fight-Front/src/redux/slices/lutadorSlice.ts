import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { Lutador } from '../../tipos/lutadorTipo'
import { RootState } from '../store'

const lutadoresAdapter = createEntityAdapter<Lutador, string>({
    selectId: (lutador) =>  lutador.id
})

const initialState = lutadoresAdapter.setAll(
    lutadoresAdapter.getInitialState(),
    [   
        {
            id: "1",
            userId: "1",
            img: "/charles.png",
            nome: "Charles do Bronx",
            cidade: "Guarujá",
            estado: "SP",
            modalidade: ["Jiu Jitsu", "MMA"],
            peso: 89
        }
        ,
        {
            id: "2",
            userId:"2",
            img: "/charles.png",
            nome: "Maycom stevão",
            cidade: "Madureira",
            estado: "RJ",
            modalidade: ["Judo"],
            peso: 98
        }
    ]
)

const lutadorSlice = createSlice({
    name: 'lutadores',
    initialState,
    reducers: {
        setLutadores: lutadoresAdapter.setAll,
        adicionarLutador: lutadoresAdapter.addOne,
        removerLutador: lutadoresAdapter.removeOne
    }
})

export const lutadoresSelectors = lutadoresAdapter.getSelectors((state: RootState) => state.lutadores)

export const {setLutadores, adicionarLutador, removerLutador } = lutadorSlice.actions

export default lutadorSlice.reducer