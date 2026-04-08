import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hookers"
import { atualizarUsuario, deletarUsuario } from "../../redux/requisicoes/usuarioThunk"
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hookers"
import "./userModal.css";

type Tab = "profile" | "fighters";

interface UserPreferences {
    myModalities: string[];
    peso: number
    email: string
    senha: string
    estado: string
    cidade: string
}


interface User {
    email: string
    senha: string
}

interface FighterPreferences {
    distance: number;
    experienceLevels: string[];
    preferredModalities: string[];
    matchGoals: string[];
    
}

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: UserPreferences, fighter: FighterPreferences) => void;
    initialUserPrefs?: Partial<UserPreferences>;
    initialFighterPrefs?: Partial<FighterPreferences>;
}

const ALL_MODALITIES = ["MMA", "Jiu Jitsu", "Muay Thai", "Boxe", "Wrestling", "Judô", "Capoeira"];
const MY_MODALITIES = ["MMA", "Jiu Jitsu", "Muay Thai", "Boxe", "Wrestling", "Judô"];



const DEFAULT_USER: User = {
    email: "maycom@email.com",
    senha: "1234",
};


const DEFAULT_USER_PREFERENCES: UserPreferences = {
    myModalities: [],
    peso: 80,
    email: "",
    senha: "",
    estado: "",
    cidade: "",
};

const DEFAULT_FIGHTER: FighterPreferences = {
    distance: 100,
    experienceLevels: ["Iniciante", "Amador", "Profissional"],
    preferredModalities: ["MMA", "Muay Thai"],
    matchGoals: ["Treino"],
};

const UserModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialUserPrefs = {},
    initialFighterPrefs = {},
}) => {
    const [activeTab, setActiveTab] = useState<Tab>("profile");

    const [userPrefs, setUserPrefs] = useState<UserPreferences>({
    ...DEFAULT_USER_PREFERENCES,
    ...initialUserPrefs,
    });

    const usuario = useAppSelector(state => state.usuario)
    if (!usuario) return null

    const [user, setUser] = useState<User>({
    ...DEFAULT_USER,
    ...initialUserPrefs,
    });

    const [fighterPrefs, setFighterPrefs] = useState<FighterPreferences>({
    ...DEFAULT_FIGHTER,
    ...initialFighterPrefs,
    });
    
    const nav = useNavigate()
    const dispatch = useAppDispatch()

    if (!isOpen) return null;



    const toggleMyModality = (mod: string) => {
    setUserPrefs((prev) => ({
        ...prev,
        myModalities: prev.myModalities.includes(mod)
        ? prev.myModalities.filter((m) => m !== mod)
        : [...prev.myModalities, mod],
    }));
    };


    const toggleFighterTag = (
    key: keyof Pick<FighterPreferences, "experienceLevels" | "preferredModalities" | "matchGoals">,
    value: string
    ) => {
    setFighterPrefs((prev) => ({
        ...prev,
        [key]: prev[key].includes(value)
        ? (prev[key] as string[]).filter((v) => v !== value)
        : [...(prev[key] as string[]), value],
    }));
    };

    const handleExcluir = () => {
        dispatch(deletarUsuario(usuario.id))
        onClose();
        nav("/")
    };

    

    const handleSave = () => {
        dispatch(atualizarUsuario({
        id: usuario.id, 
        dados: {
            email: user.email,
            senha: user.senha
        }
    }))
    onClose();
    };

    return (
    <div className="sm-overlay" onClick={onClose}>
        <div className="sm-modal" onClick={(e) => e.stopPropagation()}>

        <div className="sm-header">
            <h2 className="sm-title">Configurações</h2>
            <button className="sm-close" onClick={onClose} aria-label="Fechar">✕</button>
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
                    <p className="sm-section-label">Informações</p>

                    <div style={{display: "flex", gap: "20px"}}>
                        <div>
                            <p>Email</p>
                            <input type="text" value={user.email}
                            onChange={(e) =>
                                setUser((prev) => ({ ...prev, email: e.target.value }))
                            }/>
                        </div>
                        <div>
                            <p>Senha</p>
                            <input type="text" value={user.senha} 
                            onChange={(e) =>
                                setUser((prev) => ({ ...prev, senha: e.target.value }))
                            }/>
                        </div>

                    </div>

                    <div style={{display: "flex", gap: "20px"}} >
                        <div>
                            <p>Cidade</p>
                            <input type="text" value={userPrefs.cidade}
                            onChange={(e) =>
                                setUserPrefs((prev) => ({ ...prev, cidade: e.target.value }))
                            }/>
                        </div>
                        <div>
                            <p>Estado</p>
                            <input type="text" typeof="checkbox"  value={userPrefs.estado}
                            onChange={(e) =>
                                setUserPrefs((prev) => ({ ...prev, estado: e.target.value }))
                            }/>
                        </div>
                        
                    </div>
                    
                    <div>
                        <p>Peso</p>
                        <div className="sm-range-row">
                            <input
                            type="range"
                            min={5}
                            max={200}
                            step={1}
                            value={userPrefs.peso}
                            onChange={(e) =>
                                setUserPrefs((prev) => ({ ...prev, peso: Number(e.target.value) }))
                            }
                            className="sm-range"
                            />
                            <span className="sm-range-val">{userPrefs.peso} KG</span>
                        </div>
                    </div>

                    <p className="sm-section-label">Minhas modalidades</p>
                    <div className="sm-tag-row">
                        {MY_MODALITIES.map((mod) => (
                        <button
                            key={mod}
                            className={`sm-tag ${userPrefs.myModalities.includes(mod) ? "sm-tag--active" : ""}`}
                            onClick={() => toggleMyModality(mod)}
                        >
                            {mod}
                        </button>
                        ))}
                    </div>

                    <div className="sm-center-row">
                        <button className="sm-btn-excluir" onClick={handleExcluir}>Excluir perfil</button>
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
                        step={5}
                        value={fighterPrefs.distance}
                        onChange={(e) =>
                            setFighterPrefs((prev) => ({ ...prev, distance: Number(e.target.value) }))
                        }
                        className="sm-range"
                        />
                        <span className="sm-range-val">{fighterPrefs.distance}km</span>
                    </div>


                    <p className="sm-section-label">Modalidades preferidas</p>
                    <div className="sm-tag-row">
                        {ALL_MODALITIES.map((mod) => (
                        <button
                            key={mod}
                            className={`sm-tag ${fighterPrefs.preferredModalities.includes(mod) ? "sm-tag--active" : ""}`}
                            onClick={() => toggleFighterTag("preferredModalities", mod)}
                        >
                            {mod}
                        </button>
                        ))}
                    </div>

                
                </div>
            )}
            </div>

            <div className="sm-footer">
            <button className="sm-btn-cancel" onClick={onClose}>Cancelar</button>
            <button className="sm-btn-save" onClick={handleSave}>Salvar Preferências</button>
            </div>

        </div>
        </div>
    );
};

export default UserModal;
