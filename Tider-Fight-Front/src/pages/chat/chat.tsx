import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hookers";
import { getMensagens, criarMensagem } from "../../redux/requisicoes/mensagemThunk";
import { mensagensSelectors } from "../../redux/slices/mensagemSlice";
import "./chat.css";

interface ChatProps {
    desktopProps?: { conversaId: string; nomeMatch: string; foto: string }
    onVoltar?: () => void
}

export default function Chat({ desktopProps, onVoltar }: ChatProps) {
    const nav = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()
    const [texto, setTexto] = useState<string>("")

    const conversaId = desktopProps?.conversaId ?? location.state?.conversaId
    const nomeMatch  = desktopProps?.nomeMatch  ?? location.state?.nomeMatch
    const foto       = desktopProps?.foto       ?? location.state?.foto

    const usuario = useAppSelector(state => state.usuario)

    function getIdDoToken(): number | null {
        const token = localStorage.getItem('token')
        if (!token) return null
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.id
    }

    useEffect(() => {
        if (conversaId == null || nomeMatch == null) return
        dispatch(getMensagens(conversaId))
    }, [conversaId, nomeMatch, dispatch])

    const GoConversa = () => onVoltar ? onVoltar() : nav("/conversas")

    const mensagens = useAppSelector(mensagensSelectors.selectAll)

    const enviarMensagem = () => {
        if (!texto.trim()) return
        dispatch(criarMensagem({
            idConversa: conversaId,
            texto_mensagem: texto,
        }))
        setTexto("")
    }

    const meuId = getIdDoToken()

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="user-info">
                    <img className="avatar" src={foto} alt={nomeMatch} />
                    <span>{nomeMatch}</span>
                </div>
                <div className="menu" onClick={GoConversa}>☰</div>
            </div>
            <div className="chat-body">
                {mensagens.map((msg) => (
                    <div
                        key={msg.id_mensagem}
                        className={`message-row ${Number(msg.sender) === Number(meuId) ? "me" : "other"}`}
                    >
                        {Number(msg.sender) !== Number(meuId) && (
                            <img src={foto} className="avatar small" alt={nomeMatch} />
                        )}
                        <div className="message-bubble">{msg.texto_mensagem}</div>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    value={texto}
                    onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Digite uma mensagem..."
                />
                <button onClick={enviarMensagem}>Enviar</button>
            </div>
        </div>
    )
}