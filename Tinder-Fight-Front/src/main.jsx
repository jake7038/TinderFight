import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import {Login} from './pages/login/login'
import { Principal } from './pages/principal/principal'
import Chat from './pages/chat/chat'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import Conversa from './pages/conversa/conversa'
import { DesktopLayout } from './pages/DesktopLayout/DesktopLayout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/lutadores" element={<DesktopLayout />} />
                    <Route path="/conversas" element={<DesktopLayout initialTab="conversas" />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
                <ToastContainer position="top-center" autoClose={3000} theme="dark" />
            </BrowserRouter>
        </Provider>
    </StrictMode>
)