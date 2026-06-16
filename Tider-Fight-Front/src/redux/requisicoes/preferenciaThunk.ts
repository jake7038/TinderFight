import { createAsyncThunk } from "@reduxjs/toolkit"
import { Preferencia } from "../../tipos/preferenciaTipo"
import { RootState } from "../store"

const BASE_URL = import.meta.env.VITE_SERVER

function getToken(getState: () => unknown): string {
    const state = getState() as RootState
    return localStorage.getItem('token') ?? ''
}

export const getPreferencias = createAsyncThunk<
    Preferencia,
    void,
    { rejectValue: string }
>(
    "preferencias/fetchPreferencias",
    async (_, { getState, rejectWithValue }) => {
        const token = getToken(getState)

        const res = await fetch(`${BASE_URL}/preferencia`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })

        const data = await res.json()

        if (!res.ok) {
            return rejectWithValue(data.mensagem ?? 'Erro ao buscar preferências.')
        }

        return data as Preferencia
    }
)

export const criarPreferencia = createAsyncThunk<
    Preferencia,
    Omit<Preferencia, 'id_preferencia' | 'id_usuario' | 'created_at' | 'updated_at'>,
    { rejectValue: string }
>(
    "preferencias/criarPreferencia",
    async (dados, { getState, rejectWithValue }) => {
        const token = getToken(getState)

        const res = await fetch(`${BASE_URL}/preferencia`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        })

        const data = await res.json()

        if (!res.ok) {
            return rejectWithValue(data.mensagem ?? 'Erro ao criar preferência.')
        }

        return data as Preferencia
    }
)

export const atualizarPreferencia = createAsyncThunk<
    Preferencia,
    Partial<Preferencia>,
    { rejectValue: string }
>(
    "preferencias/atualizarPreferencia",
    async (dados, { getState, rejectWithValue }) => {
        const token = getToken(getState)

        const res = await fetch(`${BASE_URL}/preferencia`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        })

        const data = await res.json()

        if (!res.ok) {
            return rejectWithValue(data.mensagem ?? 'Erro ao atualizar preferência.')
        }

        return data as Preferencia
    }
)