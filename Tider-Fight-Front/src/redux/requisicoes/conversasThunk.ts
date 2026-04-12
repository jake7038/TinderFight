import { createAsyncThunk } from "@reduxjs/toolkit"
import { Conversas } from "../../tipos/conversasTipo"

const URL = "http://localhost:8000/conversas"

export const getConversas = createAsyncThunk(
    "conversas/fetchConversas",
    async (usuarioId: string) => {
        const res = await fetch(URL)
        const data = await res.json()

        return data //nao é o ideial filtrar o resultado, fazer o filtro no banco quando alterar para banco relacional
            .filter((c: any) =>
                c.usuarioId === usuarioId || c.matchId === usuarioId
            )
            .map((c: any) => ({
                ...c,
                date: new Date(c.date).toISOString()
            }))
    }
)


export const criarConversa = createAsyncThunk(
    "conversas/criarConversa",
    async (dados: Partial<Conversas>) => {

        const resCheck = await fetch(
            `${URL}?usuarioId=${dados.usuarioId}&matchId=${dados.matchId}`
        )
        const conversasDiretas = await resCheck.json()

        const resCheckInvertido = await fetch(
            `${URL}?usuarioId=${dados.matchId}&matchId=${dados.usuarioId}`
        )
        const conversasInvertidas = await resCheckInvertido.json()

        if (conversasDiretas.length > 0 || conversasInvertidas.length > 0) {
            return conversasDiretas[0] || conversasInvertidas[0]
        }

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



export const deletarConversa = createAsyncThunk(
    "conversas/deletarConversa",
    async (id: string) => {
        await fetch(`${URL}/${id}`, {
            method: "DELETE"
        })

        return id
    }
)