import { createAsyncThunk } from "@reduxjs/toolkit"
import { Conversas } from "../../tipos/conversasTipo"

const URL = "http://localhost:8000/conversas"

export const getConversas = createAsyncThunk(
    "conversas/fetchConversas",
    async () => {
        const res = await fetch(URL)
        const data = await res.json()

        return data.map((c: any) => ({
            ...c,
            date: new Date(c.date).toISOString()
        }))
    }
)


export const criarConversa = createAsyncThunk(
    "conversas/criarConversa",
    async (dados: Partial<Conversas>) => {
        const res = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...dados,
                date: new Date().toISOString()
            })
        })

        return await res.json()
    }
)


export const editarConversa = createAsyncThunk(
    "conversas/editarConversa",
    async ({ id, dados }: { id: string, dados: Partial<Conversas> }) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })

        return await res.json()
    }
)


export const deletarConversa = createAsyncThunk(
    "conversas/deletarConversa",
    async (id: string) => {
        await fetch(`${URL}/${id}`, {
            method: "DELETE"
        })

        return id
    }
)