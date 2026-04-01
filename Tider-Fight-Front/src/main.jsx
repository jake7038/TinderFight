import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import {Login} from './pages/login/login'
import { Principal } from './pages/principal/principal'
import Chat from './pages/chat/chat'
import { store } from './redux/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(

    <StrictMode >
        <Provider store={store}>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/lutadores" element={<Principal />} />
                <Route path="/chat" element={<Chat/>} />
            </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
