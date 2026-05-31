import { createAsyncThunk } from '@reduxjs/toolkit'
import { Lutador } from '../../tipos/lutadorTipo'
import { useAppSelector } from '../hookers'

const URL = 'http://localhost:8000/lutadores'

export const fetchLutadores = createAsyncThunk(
    'lutadores/fetchLutadores',
    async (userId: string) => {
        const res = await fetch(URL)
        const data = await res.json()
        return data.filter((l: Lutador) => l.userId !== userId)
    }
)

export const criarLutador = createAsyncThunk(
    'lutadores/criarLutador',
    async (dados: Partial<Lutador>, thunkAPI) => {
        console.log(dados.userId)
        const resCheck = await fetch(`${URL}?userId=${String(dados.userId)}`)
        const res = await resCheck.json()
        console.log(res.length)
        if (res.length > 0) {
        const atualizacao = await thunkAPI.dispatch(atualizarLutador({ id: res[0].id, dados }))
        return atualizacao.payload

        }else{
            const res = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })

        return await res.json()
        }
        
    }
)

export const atualizarLutador = createAsyncThunk(
    'lutadores/atualizarLutador',
    async ({ id, dados }: { id: string, dados: Partial<Lutador> }) => {
        const res = await fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        
        return await res.json()
    }
)


export const deletarLutador = createAsyncThunk(
    'lutadores/deletarLutador',
    async (userId: string) => {
        console.log("userId:", userId)

        const res = await fetch(`${URL}?userId=${userId}`)
        const lista = await res.json()

        if (lista.length > 0) {
            const id = lista[0].id

            await fetch(`${URL}/${id}`, {
                method: 'DELETE'
            })

            return id
        }

        return null
    }
)