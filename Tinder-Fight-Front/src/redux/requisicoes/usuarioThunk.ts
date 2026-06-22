import { createAsyncThunk } from '@reduxjs/toolkit'
import { Usuario } from '../../tipos/usuarioTipo'

const API_URL = import.meta.env.VITE_SERVER

interface LoginResponse {
    mensagem: string
    usuario: Usuario
}

export const fetchUsuario = createAsyncThunk<
    LoginResponse,
    { email: string; senha: string },
    { rejectValue: string }
>(
    'usuario/fetchUsuario',
    async ({ email, senha }, { rejectWithValue }) => {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        })
        const data = await res.json()
        console.log('data do back:', data) 
        if (!res.ok) {
            return rejectWithValue(data.mensagem ?? 'Erro ao fazer login.')
        }

        localStorage.setItem('token', data.token)
        return { mensagem: data.mensagem, usuario: data.usuario }
    }
)

export const criarUsuario = createAsyncThunk<
    Usuario,
    { email: string; senha: string },
    { rejectValue: string }
>(
    'usuario/criarUsuario',
    async (novoUsuario, { rejectWithValue }) => {
        const res = await fetch(`${API_URL}/usuario`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoUsuario)
        })
        const data: Usuario & { mensagem?: string } = await res.json()
        if (!res.ok) {
            return rejectWithValue(data.mensagem ?? 'Erro ao criar usuário.')
        }
        return data
    }
)

export const atualizarUsuario = createAsyncThunk<
    void,
    { email?: string; senha?: string },
    { rejectValue: string }
>(
    'usuario/atualizarUsuario',
    async (dados, { rejectWithValue }) => {
        const token = localStorage.getItem('token')
        const res = await fetch(`${API_URL}/usuario`, {  // <- sem /${id}
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        })

        if (!res.ok) {
            const data = await res.json()
            return rejectWithValue(data.mensagem ?? 'Erro ao atualizar usuário.')
        }
    }
)

export const deletarUsuario = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    'usuario/deletarUsuario',
    async (id, { rejectWithValue }) => {
        const token = localStorage.getItem('token')

        const res = await fetch(`${API_URL}/usuario`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!res.ok) {
            const data: { mensagem?: string } = await res.json()

            return rejectWithValue(
                data.mensagem ?? 'Erro ao deletar usuário.'
            )
        }

        return id
    }
)