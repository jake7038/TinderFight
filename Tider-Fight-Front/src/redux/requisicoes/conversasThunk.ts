import { createAsyncThunk } from "@reduxjs/toolkit"
import { Conversas } from "../../tipos/conversasTipo"
import { RootState } from "../store"

const BASE_URL = import.meta.env.VITE_SERVER

function getToken(getState: () => unknown): string {
    const state = getState() as RootState
    return localStorage.getItem('token') ?? ''
}

export const getConversas = createAsyncThunk<
    Conversas[],
    void,
    { rejectValue: string }
>(
    "conversas/fetchConversas",
    async (_, { getState, rejectWithValue }) => {
        const token = getToken(getState)

        const res = await fetch(`${BASE_URL}/conversa`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })

        const data = await res.json()

        if (!res.ok) {
            return rejectWithValue(data.mensagem ?? 'Erro ao buscar conversas.')
        }

        return data as Conversas[]
    }
)

export const criarConversa = createAsyncThunk<
    Conversas | null,
    { id_usuario2: string },
    { rejectValue: string }
>(
    "conversas/criarConversa",
    async ({ id_usuario2 }, { getState, rejectWithValue }) => {
        const token = getToken(getState)

        const res = await fetch(`${BASE_URL}/fight`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id_usuario_alvo: id_usuario2 })
        })

        const data = await res.json()

        if (!res.ok) {
            return rejectWithValue(data.mensagem ?? 'Erro ao registrar like.')
        }

        // Se houve match o server retorna a conversa, senão retorna null
        return data.match ? (data.conversa as Conversas) : null
    }
)

export const deletarConversa = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    "conversas/deletarConversa",
    async (id, { getState, rejectWithValue }) => {
        const token = getToken(getState)

        const res = await fetch(`${BASE_URL}/conversa/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        })

        if (!res.ok) {
            const data = await res.json()
            return rejectWithValue(data.mensagem ?? 'Erro ao deletar conversa.')
        }

        return id
    }
)