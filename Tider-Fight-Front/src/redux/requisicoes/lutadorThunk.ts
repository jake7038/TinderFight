import { createAsyncThunk } from '@reduxjs/toolkit'
import { Lutador } from '../../tipos/lutadorTipo'
import { RootState } from '../store'

const URL = import.meta.env.VITE_SERVER

function getToken(getState: () => unknown): string {
    return  localStorage.getItem('token') ?? ''
}

export const fetchLutadores = createAsyncThunk<
    Lutador[],
    void,
    { rejectValue: string }
>(
    'lutadores/fetchLutadores',
    async (_, { getState, rejectWithValue }) => {
        const token = getToken(getState)

        const res = await fetch(`${URL}/lutadores`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })

        const data = await res.json()

        if (!res.ok) {
            return rejectWithValue(data.mensagem ?? 'Erro ao buscar lutadores.')
        }

        return data as Lutador[]
    }
)

export const criarLutador = createAsyncThunk<
    Lutador,
    Partial<Lutador>,
    { rejectValue: string }
>(
    'lutadores/criarLutador',
    async (dados, { getState, rejectWithValue }) => {
        const token = getToken(getState)

        const res = await fetch(`${URL}/lutadores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        })

        const data = await res.json()

        if (!res.ok) {
            return rejectWithValue(data.mensagem ?? 'Erro ao criar lutador.')
        }

        return data as Lutador
    }
)

export const atualizarLutador = createAsyncThunk<
    Lutador,
    { id: string; dados: Partial<Lutador> },
    { rejectValue: string }
>(
    'lutadores/atualizarLutador',
    async ({ id, dados }, { getState, rejectWithValue }) => {
        const token = getToken(getState)

        const res = await fetch(`${URL}/lutadores/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        })

        const data = await res.json()

        if (!res.ok) {
            return rejectWithValue(data.mensagem ?? 'Erro ao atualizar lutador.')
        }

        return data as Lutador
    }
)

export const deletarLutador = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    'lutadores/deletarLutador',
    async (id, { getState, rejectWithValue }) => {
        const token = getToken(getState)

        const res = await fetch(`${URL}/lutadores/`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })

        if (!res.ok) {
            const data = await res.json()
            return rejectWithValue(data.mensagem ?? 'Erro ao deletar lutador.')
        }

        return id
    }
)