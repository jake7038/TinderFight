import { createAsyncThunk } from "@reduxjs/toolkit"
import { Mensagem } from "../../tipos/mensagemTipo"
import { RootState } from "../store"

const BASE_URL = import.meta.env.VITE_SERVER

function getToken(getState: () => unknown): string {
    const state = getState() as RootState
    return localStorage.getItem('token') ?? ''
}

export const getMensagens = createAsyncThunk<
    Mensagem[],
    string,
    { rejectValue: string }
>(
    "mensagens/fetchMensagens",
    async (idConversa, { getState, rejectWithValue }) => {
        const token = getToken(getState)
        const res = await fetch(`${BASE_URL}/mensagem/all/${idConversa}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        console.log("getData:", data)
        if (!res.ok) {
            return rejectWithValue(data.mensagem ?? 'Erro ao buscar mensagens.')
        }
        return data as Mensagem[]
    }
)

export const criarMensagem = createAsyncThunk<
    Mensagem,
    { idConversa: string; texto_mensagem: string },
    { rejectValue: string }
>(
    "mensagens/criarMensagem",
    async ({ idConversa, texto_mensagem }, { getState, rejectWithValue }) => {
        const token = getToken(getState)
        const res = await fetch(`${BASE_URL}/mensagem/${idConversa}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ texto_mensagem })
        })
        const data = await res.json()
        if (!res.ok) {
            return rejectWithValue(data.mensagem ?? 'Erro ao enviar mensagem.')
        }
        return data as Mensagem
    }
)

export const editarMensagem = createAsyncThunk<
    Mensagem,
    { id: string; texto_mensagem: string },
    { rejectValue: string }
>(
    "mensagens/editarMensagem",
    async ({ id, texto_mensagem }, { getState, rejectWithValue }) => {
        const token = getToken(getState)
        const res = await fetch(`${BASE_URL}/mensagens/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ texto_mensagem })
        })
        const data = await res.json()
        if (!res.ok) {
            return rejectWithValue(data.mensagem ?? 'Erro ao editar mensagem.')
        }
        return data as Mensagem
    }
)

export const deletarMensagem = createAsyncThunk<
    number,
    string,
    { rejectValue: string }
>(
    "mensagens/deletarMensagem",
    async (id, { getState, rejectWithValue }) => {
        const token = getToken(getState)
        const res = await fetch(`${BASE_URL}/mensagens/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        })
        if (!res.ok) {
            const data = await res.json()
            return rejectWithValue(data.mensagem ?? 'Erro ao deletar mensagem.')
        }
        return Number(id)
    }
)