import React, { useEffect, useState } from "react";
import { conversasSelectors } from "../../redux/slices/conversasSlice";
import { getConversas, deletarConversa } from "../../redux/requisicoes/conversasThunk";
import { Conversas } from "../../tipos/conversasTipo";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hookers";
import "./conversa.css";
type FooterTab = "swap" | "chat" | "profile" | "history";

interface ChatListProps {
    activeTab?: FooterTab;
    onChatSelect?: (conversa: Conversas) => void;
    onTabChange?: (tab: FooterTab) => void;
}



const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
        return new Date(date).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });
    }
    if (days === 1) return "ontem";
    if (days < 7) {
    return new Date(date).toLocaleDateString("pt-BR", { weekday: "short" });
    }
    return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    });
};

function Conversa  () {

    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const usuario = useAppSelector(state => state.usuario)
    const conversas = useAppSelector(conversasSelectors.selectAll)
    const [search, setSearch] = useState("");


    const golutador = () => {
    
    nav("/lutadores")
    }

    const GoChat = () => {
        nav("/chat")
    }

    const deletarMatch = (id: string) => {
        dispatch(deletarConversa(id))
    }


    useEffect(() => {
        if (!usuario?.id) return

        dispatch(getConversas(usuario.id))
    }, [usuario, dispatch])    
    
    


    const filtered = conversas?.filter((c) =>
        (c.lastMessage || "").toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className="cl-screen">

        <div className="cl-header">
            <div className="cl-header-top">
            <h1 className="cl-header-title">
                Suas <span>Lutas</span>
            </h1>
            <span className="cl-match-count">{conversas.length} Lutas</span>
            </div>
        
        </div>

        <div className="cl-list">
            {filtered.length === 0 && (
            <div className="cl-empty">Nenhuma conversa encontrada</div>
            )}
            {filtered.map((conversa, i) => (
            <button onClick={GoChat}
                key={conversa.id}
                className="cl-item"
                style={{ animationDelay: `${i * 60}ms` }}
                
            >
                <div className="cl-avatar">
                {conversa.image ? (
                    <img
                    className="cl-avatar-img"
                    src={conversa.image}
                    alt="foto do lutador"
                    />
                ) : (
                    <div className="cl-avatar-fallback">#</div>
                )}
                </div>

                <div className="cl-item-body">
                <div className="cl-item-row">
                    <span className="cl-item-name">{conversa.matchNome}</span>
                    <div className="cl-item-row">
                    <img  className="cl-trash" onClick={(e) => {e.stopPropagation(); deletarMatch(conversa.id)}} src="/lixeira.png"></img>
                    <span className="cl-item-time">{formatDate(conversa.date)}</span>
                    </div>
                    
                </div>
                
                
                <div className="cl-item-row">
                    <span className="cl-item-preview">{conversa.lastMessage}</span>
                </div>
                </div>
            </button>
            ))}
        </div>

            <footer>
                <div>
                    
                    <div>
                        <img src="/gloveWhite.png" onClick={golutador} alt="" />
                        <p>Swap</p>
                    </div>
                    
                    <div>
                        <img src="/chatVermelho.png" alt=""  />
                        <p>Chat</p>
                    </div>
                    
                    <div>
                        <img src="/lutador.png" alt="" />
                        <p>Perfil do Lutador</p>
                    </div>

                
                </div>
            </footer>
        </div>
    );
};

export default Conversa;
