import React, { useState } from "react";
import { useSelector } from "react-redux";
import { conversasSelectors } from "../../redux/slices/conversasSlice";
import { Conversas } from "../../tipos/conversasTipo";
import "./conversa.css";
import { useNavigate } from "react-router-dom";

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

    const golutador = () => {
    
    nav("/lutadores")
    }

    const GoChat = () => {
        nav("/chat")
    }

    const conversas = useSelector(conversasSelectors.selectAll);
    const [search, setSearch] = useState("");

    const filtered = conversas.filter((c) =>
        c.lastMessage.toLowerCase().includes(search.toLowerCase())
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
                    <span className="cl-item-time">{formatDate(conversa.date)}</span>
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
