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

    function getIdDoToken() {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.id; 
    }

    useEffect(() => {
        if (conversaId == null|| nomeMatch == null) return 
        dispatch(getMensagens(conversaId))
        
    }, [conversaId, nomeMatch,dispatch])

    const GoConversa = () => nav("/conversas")
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
                    <img className="avatar" src={foto} />
                    <span>{nomeMatch}</span>
                </div>
                <div className="menu" onClick={GoConversa}>☰</div>
            </div>
            <div className="chat-body">
                {mensagens.map((msg) => (
                    <div key={msg.id_mensagem} className={`message-row ${Number(msg.sender) === Number(meuId) ? "me" : "other"}`}>
                        {Number(msg.sender) !== Number(meuId) && <img src={foto} className="avatar small" />}
                        <div className="message-bubble">{msg.texto_mensagem}</div>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input value={texto} onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()} onChange={(e) => setTexto(e.target.value)} placeholder="Digite uma mensagem..." />
                <button onClick={enviarMensagem}>Enviar</button>
            </div>
        </div>
    );
}