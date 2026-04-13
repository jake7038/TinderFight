import { createAsyncThunk } from "@reduxjs/toolkit"
import { Mensagem } from "../../tipos/mensagemTipo"

const URL = "http://localhost:8000/mensagens"

export const getMensagens = createAsyncThunk(
    "mensagens/fetchMensagens",
    async (conversaid: string) => {
        const res = await fetch(`${URL}?conversaid=${conversaid}`)
        const data = await res.json()
        
        return data.map((m: any) => ({
            ...m,
            time: new Date(m.time).toISOString()
        }))
    }
)

export const criarMensagem = createAsyncThunk(
    "mensagens/criarMensagem",
    async (dados: Partial<Mensagem>) => {
        const res = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...dados,
                time: new Date().toISOString()
            })
        })

        return await res.json()
    }
)

export const editarMensagem = createAsyncThunk(
    "mensagens/editarMensagem",
    async ({ id, dados }: { id: string, dados: Partial<Mensagem> }) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })

        return await res.json()
    }
)

export const deletarMensagem = createAsyncThunk(
    "mensagens/deletarMensagem",
    async (id: string) => {
        await fetch(`${URL}/${id}`, {
            method: "DELETE"
        })

        return id
    }
)