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

function useIsDesktop() {
    return window.innerWidth >= 900
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/lutadores" element={
                        window.innerWidth >= 900 ? <DesktopLayout /> : <Principal />
                    } />
                    <Route path="/conversas" element={
                        window.innerWidth >= 900 ? <DesktopLayout /> : <Conversa />
                    } />
                    <Route path="/chat" element={<Chat />} />
                
                </Routes>
                <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        theme="dark"
                    />
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
