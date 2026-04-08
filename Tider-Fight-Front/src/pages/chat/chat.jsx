import React from "react";
import { useNavigate } from "react-router-dom";
import "./chat.css";


export default function Chat() {

    const nav = useNavigate()

    const GoConversa = () =>{
        nav("/conversas")
    }
    const messages = [
    {
        id: 1,
        text: "Fala tu!",
        sender: "other",
        time: "20:41",
    },
    {
        id: 2,
        text: "Opa!",
        sender: "me",
        time: "20:42",
    },
    ];

    return (
    <div className="chat-container">

        <div className="chat-header">
            <div className="user-info">
            <img className="avatar" src="/charles.png" />
            <span>Charles do Bronx</span>
            </div>
            <div className="menu" onClick={GoConversa}>☰</div>
        </div>

        <div className="chat-body">
            <div className="chat-date">ter. 17 de mar, 17:40</div>

            {messages.map((msg) => (
                <div key={msg.id} className={`message-row ${ msg.sender === "me" ? "me" : "other"}`}>
                {msg.sender === "other" && <img src="/charles.png" className="avatar small" />}
                    <div className="message-bubble">{msg.text}</div>
                </div>
            ))}
        </div>

        <div className="chat-input">
            <input placeholder="Digite uma mensagem..." />
            <button>Enviar</button>
        </div>
    </div>
    );
}