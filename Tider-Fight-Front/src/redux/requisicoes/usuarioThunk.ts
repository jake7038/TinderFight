import { createAsyncThunk } from '@reduxjs/toolkit'
import { Usuario } from '../../tipos/usuarioTipo'

const API_URL = 'http://localhost:8000/usuarios'

export const fetchUsuario = createAsyncThunk(
    'usuario/fetchUsuario',
    async ({ email, senha }: { email: string; senha: string }) => {

        const res = await fetch(`${API_URL}?email=${email}`)
        const data: Usuario[] = await res.json()

        const usuario = data.find(u => u.senha === senha)

        if (!usuario) {
            throw new Error('Email ou senha inválidos')
        }

        return usuario
    }
)

export const criarUsuario = createAsyncThunk(
    'usuario/criarUsuario',
    async (novoUsuario: Omit<Usuario, 'id'>) => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoUsuario)
        })
        return await res.json()
    }
)

export const atualizarUsuario = createAsyncThunk(
    'usuario/atualizarUsuario',
    async ({ id, dados }: { id: string; dados: Partial<Usuario> }) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })

        return await res.json()
    }
)


export const deletarUsuario = createAsyncThunk(
    'usuario/deletarUsuario',
    async (id: string) => {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        return id
    }
)