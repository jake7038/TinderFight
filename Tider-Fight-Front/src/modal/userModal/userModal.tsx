import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hookers";
import { atualizarUsuario, deletarUsuario } from "../../redux/requisicoes/usuarioThunk";
import { criarLutador, deletarLutador } from "../../redux/requisicoes/lutadorThunk";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../../tipos/usuarioTipo";
import { Lutador } from "../../tipos/lutadorTipo";
import "./userModal.css";

type Tab = "profile" | "fighters";

interface FighterPreferences {
    distance: number;
    experienceLevels: string[];
    preferredModalities: string[];
    matchGoals: string[];
}

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ALL_MODALITIES = ["MMA", "Jiu Jitsu", "Muay Thai", "Boxe", "Wrestling", "Judô", "Capoeira"];
const MY_MODALITIES = ["MMA", "Jiu Jitsu", "Muay Thai", "Boxe", "Wrestling", "Judô", "Capoeira"];

const DEFAULT_FIGHTER: FighterPreferences = {
    distance: 100,
    experienceLevels: ["Iniciante", "Amador", "Profissional"],
    preferredModalities: ["MMA", "Muay Thai"],
    matchGoals: ["Treino"],
};



const UserModal = ({ isOpen, onClose }: SettingsModalProps) => {
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const usuario = useAppSelector(state => state.usuario);

    const [activeTab, setActiveTab] = useState<Tab>("profile");

    const [user, setUser] = useState<Partial<Usuario>>({
        email: "",
        senha: ""
    });

    const [incognito, setIncognito] = useState(false)

    const [userPrefs, setUserPrefs] = useState<Partial<Lutador>>({
        nome: "",
        modalidade: [],
        img: "/charles.png",
        userId: usuario?.id,
        peso: 80,
        cidade: "",
        estado: "",
    });

    const [fighterPrefs, setFighterPrefs] = useState<FighterPreferences>(DEFAULT_FIGHTER);

    useEffect(() => {
        if (usuario) {
            setUser({
                email: usuario.email,
                senha: usuario.senha
            });

            setUserPrefs(prev => ({
                ...prev,
                userId: usuario.id
            }));
        }
    }, [usuario]);

    if (!isOpen || !usuario) return null;

    const toggleMyModality = (mod: string) => {
        setUserPrefs(prev => ({
            ...prev,
            modalidade: prev.modalidade?.includes(mod)
                ? prev.modalidade.filter(m => m !== mod)
                : [...(prev.modalidade || []), mod],
        }));
    };

    const handleExcluir = () => {
        dispatch(deletarUsuario(usuario.id));
        onClose();
        nav("/");
    };

    const handleSave = () => {
        dispatch(atualizarUsuario({
            id: usuario.id,
            dados: {
                email: user.email,
                senha: user.senha
            }
        }));
        if(!incognito){
            dispatch(criarLutador({
            userId: usuario.id,
            img: "/charles.png",
            nome: userPrefs.nome,
            cidade: userPrefs.cidade,
            estado: userPrefs.estado,
            modalidade: userPrefs.modalidade,
            peso: userPrefs.peso
        }));
        }else{
            dispatch(deletarLutador(usuario.id))
        }
        

        onClose();
    };

    return (
        <div className="sm-overlay" onClick={onClose}>
            <div className="sm-modal" onClick={(e) => e.stopPropagation()}>

                
                <div className="sm-header">
                    <h2 className="sm-title">Configurações</h2>
                    <button className="sm-close" onClick={onClose}>✕</button>
                </div>

                
                <div className="sm-tabs">
                    <button
                        className={`sm-tab ${activeTab === "profile" ? "sm-tab--active" : ""}`}
                        onClick={() => setActiveTab("profile")}
                    >
                        Meu Perfil
                    </button>

                    <button
                        className={`sm-tab ${activeTab === "fighters" ? "sm-tab--active" : ""}`}
                        onClick={() => setActiveTab("fighters")}
                    >
                        Lutadores
                    </button>
                </div>

                
                <div className="sm-body">

                    {activeTab === "profile" && (
                        <div className="sm-panel">

                            <p className="sm-section-label">Informações de login</p>

                            <div style={{ display: "flex", gap: "20px" }}>
                                <div className="sm-col">
                                    <p>Email</p>
                                    <input
                                        type="text"
                                        value={user.email || ""}
                                        onChange={(e) =>
                                            setUser(prev => ({ ...prev, email: e.target.value }))
                                        }
                                    />
                                </div>

                                <div className="sm-col">
                                    <p>Senha</p>
                                    <input
                                        type="text"
                                        value={user.senha || ""}
                                        onChange={(e) =>
                                            setUser(prev => ({ ...prev, senha: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="sm-center-row">
                                <button className="sm-btn-excluir" onClick={handleExcluir}>
                                    Excluir perfil
                                </button>
                            </div>

                            <p className="sm-section-label">Informações de Lutador</p>
                            <div>
                                <p>Nome</p>
                                <input
                                    type="text"
                                    value={userPrefs.nome || ""}
                                    onChange={(e) =>
                                        setUserPrefs(prev => ({ ...prev, nome: e.target.value }))
                                    }
                                />
                            </div>

                            <div style={{ display: "flex", gap: "20px" }}>
                                <div className="sm-col" >
                                    <p>Cidade</p>
                                    <input
                                        type="text"
                                        value={userPrefs.cidade || ""}
                                        onChange={(e) =>
                                            setUserPrefs(prev => ({ ...prev, cidade: e.target.value }))
                                        }
                                    />
                                </div>

                                <div className="sm-col">
                                    <p>Estado</p>
                                    <input
                                        type="text"
                                        value={userPrefs.estado || ""}
                                        onChange={(e) =>
                                            setUserPrefs(prev => ({ ...prev, estado: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <p>Peso</p>
                                <div className="sm-range-row">
                                    <input
                                        type="range"
                                        min={5}
                                        max={200}
                                        value={userPrefs.peso || 80}
                                        onChange={(e) =>
                                            setUserPrefs(prev => ({ ...prev, peso: Number(e.target.value) }))
                                        }
                                        className="sm-range"
                                    />
                                    <span className="sm-range-val">
                                        {userPrefs.peso} KG
                                    </span>
                                </div>
                            </div>

                            <p className="sm-section-label">Minhas modalidades</p>

                            <div className="sm-tag-row">
                                {MY_MODALITIES.map(mod => (
                                    <button
                                        key={mod}
                                        className={`sm-tag ${userPrefs.modalidade?.includes(mod) ? "sm-tag--active" : ""}`}
                                        onClick={() => toggleMyModality(mod)}
                                    >
                                        {mod}
                                    </button>
                                ))}
                            </div>
                            <div className="sm-toggle-row">
                                <div className="sm-toggle-info">
                                <span className="sm-toggle-name">Modo incógnito</span>
                                <span className="sm-toggle-desc">Seu perfil não aparece para outros</span>
                                </div>
                                <button
                                className={`sm-switch ${incognito == true? "sm-switch--on" : ""} `}
                                onClick={() => setIncognito(!incognito)}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === "fighters" && (
                        <div className="sm-panel">

                            <p className="sm-section-label">Faixa de distância</p>

                            <div className="sm-range-row">
                                <span className="sm-range-label">Distância</span>

                                <input
                                    type="range"
                                    min={5}
                                    max={500}
                                    value={fighterPrefs.distance}
                                    onChange={(e) =>
                                        setFighterPrefs(prev => ({
                                            ...prev,
                                            distance: Number(e.target.value)
                                        }))
                                    }
                                    className="sm-range"
                                />

                                <span className="sm-range-val">
                                    {fighterPrefs.distance}km
                                </span>
                            </div>

                            <p className="sm-section-label">Modalidades preferidas</p>

                            <div className="sm-tag-row">
                                {ALL_MODALITIES.map(mod => (
                                    <button
                                        key={mod}
                                        className={`sm-tag ${fighterPrefs.preferredModalities.includes(mod) ? "sm-tag--active" : ""}`}
                                    >
                                        {mod}
                                    </button>
                                ))}
                            </div>

                        </div>
                    )}
                </div>

                
                <div className="sm-footer">
                    <button className="sm-btn-cancel" onClick={onClose}>
                        Cancelar
                    </button>

                    <button className="sm-btn-save" onClick={handleSave}>
                        Salvar Preferências
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UserModal;