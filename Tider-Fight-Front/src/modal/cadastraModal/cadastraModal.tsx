import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hookers";
import { criarUsuario } from "../../redux/requisicoes/usuarioThunk";
import './cadastraModal.css'

interface CadastraModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CadastraModal: React.FC<CadastraModalProps> = ({
    isOpen,
    onClose
}) => {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    
    const dispatch = useAppDispatch()

    
    const handleSubmit = (e: React.SubmitEvent) => { 
        e.preventDefault();
        dispatch(criarUsuario({ email, senha}))
    };


    

    if (!isOpen) return null;


return (
    <div className="lm-overlay" onClick={onClose}>
        <div className="lm-modal" onClick={(e) => e.stopPropagation()}>

        <div className="lm-header">
            <svg className="lm-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" stroke="#e02020" strokeWidth="2" />
            <circle cx="18" cy="18" r="8" stroke="#e02020" strokeWidth="1.5" />
            <line x1="18" y1="2" x2="18" y2="10" stroke="#e02020" strokeWidth="2" />
            <line x1="18" y1="26" x2="18" y2="34" stroke="#e02020" strokeWidth="2" />
            <line x1="2" y1="18" x2="10" y2="18" stroke="#e02020" strokeWidth="2" />
            <line x1="26" y1="18" x2="34" y2="18" stroke="#e02020" strokeWidth="2" />
            <circle cx="18" cy="18" r="3" fill="#e02020" />
            </svg>
            <h1 className="lm-logo">
            Choose Your <span>Fighter</span>
            </h1>
            <p className="lm-subtitle">Cria sua conta</p>
        </div>

        <form className="lm-body" onSubmit={handleSubmit}>
            <div className="lm-field-group">
            <label className="lm-label" htmlFor="lm-email">E-mail</label>
            <input
                id="lm-email"
                className="lm-input"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>

            <div className="lm-field-group">
            <label className="lm-label" htmlFor="lm-password">Senha</label>
            <input
                id="lm-password"
                className="lm-input"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
            />
            </div>

            <button className="lm-btn-primary" type="submit">
            Entrar no Combate
            </button>

            <div className="lm-divider">
                <button className="lm-btn-secondary" type="button" onClick={onClose}>
                    Voltar
                </button>
            </div>

        </form>


        </div>
    </div>
);
};

export default CadastraModal;
