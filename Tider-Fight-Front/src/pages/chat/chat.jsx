import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hookers";
import { getMensagens, criarMensagem } from "../../redux/requisicoes/mensagemThunk";
import { mensagensSelectors } from "../../redux/slices/mensagemSlice";
import "./chat.css";

export default function Chat() {
    const nav = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()

    const [texto, setTexto] = useState("")

    const conversaId  = location.state?.conversaId
    const nomeMatch  = location.state?.nomeMatch
    const foto = location.state?.foto
    const usuario = useAppSelector(state => state.usuario)

    useEffect(() => {
        if (conversaId == null|| nomeMatch == null) return 
        dispatch(getMensagens(conversaId))
        
    }, [conversaId, nomeMatch,dispatch])

    const GoConversa = () => nav("/conversas")
    const mensagens = useAppSelector(mensagensSelectors.selectAll)


    const enviarMensagem = () => {
        if (!texto.trim()) return

        dispatch(criarMensagem({
            conversaid: conversaId,
            text: texto,
            sender: usuario.id,
        }))

        setTexto("")
    }

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="user-info">
                    <img className="avatar" src={foto} />
                    <span>{nomeMatch}</span>
                </div>
                <div className="menu" onClick={GoConversa}>☰</div>
            </div>
            <div className="chat-body">
                {mensagens.map((msg) => (
                    <div key={msg.id} className={`message-row ${msg.sender === usuario.id ? "me" : "other"}`}>
                        {msg.sender != usuario.id && <img src={foto} className="avatar small" />}
                        <div className="message-bubble">{msg.text}</div>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Digite uma mensagem..." />
                <button onClick={enviarMensagem}>Enviar</button>
            </div>
        </div>
    );
}