import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hookers";
import { atualizarUsuario, deletarUsuario } from "../../redux/requisicoes/usuarioThunk";
import { criarLutador, deletarLutador, fetchLutadores } from "../../redux/requisicoes/lutadorThunk";
import { criarPreferencia, atualizarPreferencia } from "../../redux/requisicoes/preferenciaThunk";
import { selecionarPreferencia } from "../../redux/slices/preferenciaSlice";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../../tipos/usuarioTipo";
import { Lutador } from "../../tipos/lutadorTipo";
import "./userModal.css";
import { lutadoresSelectors } from "../../redux/slices/lutadorSlice";

type Tab = "profile" | "fighters";
type Estado = "RJ" | "SP" | ""

interface FighterPreferences {
    cidade: string;
    estado: string;
    peso: number;
    modalidades: string[];
}

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ALL_MODALITIES = ["MMA", "Jiu Jitsu", "Muay Thai", "Boxe", "Wrestling", "Judô", "Capoeira"];
const MAX_MODALITIES = 4;

const CIDADES: Record<"RJ" | "SP", string[]> = {
    RJ: ["Rio de Janeiro", "Niterói", "Duque de Caxias", "Nova Iguaçu", "São Gonçalo", "Petrópolis", "Volta Redonda", "Campos dos Goytacazes", "Angra dos Reis", "Cabo Frio", "Macaé", "Teresópolis", "Belford Roxo", "São João de Meriti"],
    SP: ["São Paulo", "Campinas", "Santos", "São Bernardo do Campo", "Guarulhos", "Santo André", "Osasco", "Ribeirão Preto", "Sorocaba", "São José dos Campos", "Mauá", "Carapicuíba", "Bauru", "Jundiaí", "Piracicaba"],
};

const DEFAULT_FIGHTER_PREFS: FighterPreferences = {
    cidade: "",
    estado: "",
    peso: 80,
    modalidades: [],
};

const EstadoCidadeSelector = ({
    estado,
    cidade,
    onEstadoChange,
    onCidadeChange,
}: {
    estado: string;
    cidade: string;
    onEstadoChange: (e: Estado) => void;
    onCidadeChange: (c: string) => void;
}) => {
    const estadoSelecionado = estado as "RJ" | "SP" | "";
    const cidades = estadoSelecionado ? CIDADES[estadoSelecionado] : [];

    const handleEstado = (e: "RJ" | "SP") => {
        if (estado === e) {
            onEstadoChange("");
            onCidadeChange("");
        } else {
            onEstadoChange(e);
            onCidadeChange("");
        }
    };

    return (
        <div>
            <p>Estado</p>
            <div className="sm-tag-row" style={{ marginBottom: "12px" }}>
                {(["RJ", "SP"] as const).map(e => (
                    <button
                        key={e}
                        className={`sm-tag ${estado === e ? "sm-tag--active" : ""}`}
                        onClick={() => handleEstado(e)}
                    >
                        {e}
                    </button>
                ))}
            </div>

            <p>Cidade</p>
            <select
                className="sm-select"
                value={cidade}
                disabled={!estadoSelecionado}
                onChange={(ev) => onCidadeChange(ev.target.value)}
            >
                <option value="">{estadoSelecionado ? "Selecione uma cidade" : "Selecione um estado primeiro"}</option>
                {cidades.map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
        </div>
    );
};

const UserModal = ({ isOpen, onClose }: SettingsModalProps) => {
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const usuario = useAppSelector(state => state.usuario);
    const preferenciaExistente = useAppSelector(selecionarPreferencia);

    const [activeTab, setActiveTab] = useState<Tab>("profile");
    const [user, setUser] = useState<Partial<Usuario>>({ email: "", senha: "" });
    const [incognito, setIncognito] = useState(false);

    const [userPrefs, setUserPrefs] = useState<Partial<Lutador>>({
        nome: "",
        modalidades: [],
        img: "",
        peso: 80,
        cidade: "",
        estado: "",
    });

    const [fighterPrefs, setFighterPrefs] = useState<FighterPreferences>(DEFAULT_FIGHTER_PREFS);

    const lutadorDoUsuario = useAppSelector(state =>
    lutadoresSelectors.selectAll(state).find(
        l => l.id_usuario === usuario?.id_usuario
    )
    )

    useEffect(() => {
        if (lutadorDoUsuario) {
            setUserPrefs({
                nome: lutadorDoUsuario.nome,
                img: lutadorDoUsuario.img,
                cidade: lutadorDoUsuario.cidade,
                estado: lutadorDoUsuario.estado,
                peso: lutadorDoUsuario.peso,
                modalidades: lutadorDoUsuario.modalidades,
            })
        }
        }, [lutadorDoUsuario])
        
    useEffect(() => {
        if (usuario) {
            setUser({ email: usuario.email, senha: usuario.senha });
        }
    }, [usuario]);

    useEffect(() => {
        if (preferenciaExistente) {
            setFighterPrefs(prev => ({
                ...prev,
                cidade: preferenciaExistente.cidade,
                estado: preferenciaExistente.estado,
                peso: preferenciaExistente.peso,
                modalidades: preferenciaExistente.modalidades ?? [],
            }));
        }
    }, [preferenciaExistente]);

    if (!isOpen || !usuario) return null;

    const toggleMyModality = (mod: string) => {
        setUserPrefs(prev => {
            const atual = prev.modalidades ?? [];
            if (atual.includes(mod)) return { ...prev, modalidades: atual.filter(m => m !== mod) };
            if (atual.length >= MAX_MODALITIES) return prev;
            return { ...prev, modalidades: [...atual, mod] };
        });
    };

    const toggleFighterModality = (mod: string) => {
        setFighterPrefs(prev => {
            if (prev.modalidades.includes(mod)) return { ...prev, modalidades: prev.modalidades.filter(m => m !== mod) };
            if (prev.modalidades.length >= MAX_MODALITIES) return prev;
            return { ...prev, modalidades: [...prev.modalidades, mod] };
        });
    };

    const handleExcluir = () => {
        dispatch(deletarUsuario(usuario.id_usuario));
        onClose();
        nav("/");
    };

    const handleSave = () => {
        if (user.email != null || user.senha != null) {
            dispatch(atualizarUsuario({ email: user.email, senha: user.senha }));
        }

        if (!incognito) {
            dispatch(criarLutador({
                img: userPrefs.img,
                nome: userPrefs.nome,
                cidade: userPrefs.cidade,
                estado: userPrefs.estado,
                modalidades: userPrefs.modalidades,
                peso: userPrefs.peso
            }));
        } else {
            dispatch(deletarLutador(String(usuario.id_usuario)));
        }

        const dadosPreferencia = {
            cidade: fighterPrefs.cidade,
            estado: fighterPrefs.estado,
            peso: fighterPrefs.peso,
            modalidades: fighterPrefs.modalidades,
        };

        if (preferenciaExistente) {
            dispatch(atualizarPreferencia(dadosPreferencia));
            dispatch(fetchLutadores())
        } else {
            dispatch(criarPreferencia(dadosPreferencia));
            dispatch(fetchLutadores())
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
                    <button className={`sm-tab ${activeTab === "profile" ? "sm-tab--active" : ""}`} onClick={() => setActiveTab("profile")}>
                        Meu Perfil
                    </button>
                    <button className={`sm-tab ${activeTab === "fighters" ? "sm-tab--active" : ""}`} onClick={() => setActiveTab("fighters")}>
                        Preferências
                    </button>
                </div>

                <div className="sm-body">

                    {activeTab === "profile" && (
                        <div className="sm-panel">

                            <p className="sm-section-label">Informações de login</p>

                            <div style={{ display: "flex", gap: "20px" }}>
                                <div className="sm-col">
                                    <p>Email</p>
                                    <input type="text" value={user.email || ""} onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))} />
                                </div>
                                <div className="sm-col">
                                    <p>Senha</p>
                                    <input type="password" value={user.senha || ""} onChange={(e) => setUser(prev => ({ ...prev, senha: e.target.value }))} />
                                </div>
                            </div>

                            <div className="sm-center-row">
                                <button className="sm-btn-excluir" onClick={handleExcluir}>Excluir perfil</button>
                            </div>

                            <p className="sm-section-label">Informações de Lutador</p>

                            <div style={{ display: "flex", gap: "20px" }}>
                                <div className="sm-col">
                                    <p>Nome</p>
                                    <input type="text" value={userPrefs.nome || ""} onChange={(e) => setUserPrefs(prev => ({ ...prev, nome: e.target.value }))} />
                                </div>
                                <div className="sm-col">
                                    <p>Link da foto</p>
                                    <input type="text" value={userPrefs.img || ""} placeholder="https://..." onChange={(e) => setUserPrefs(prev => ({ ...prev, img: e.target.value }))} />
                                </div>
                            </div>

                            <EstadoCidadeSelector
                                estado={userPrefs.estado ?? ""}
                                cidade={userPrefs.cidade ?? ""}
                                onEstadoChange={(e) => setUserPrefs(prev => ({ ...prev, estado: e }))}
                                onCidadeChange={(c) => setUserPrefs(prev => ({ ...prev, cidade: c }))}
                            />

                            <div>
                                <p>Peso</p>
                                <div className="sm-range-row">
                                    <input type="range" min={5} max={200} value={userPrefs.peso || 80} onChange={(e) => setUserPrefs(prev => ({ ...prev, peso: Number(e.target.value) }))} className="sm-range" />
                                    <span className="sm-range-val">{userPrefs.peso} KG</span>
                                </div>
                            </div>

                            <p className="sm-section-label">
                                Minhas modalidades
                                <span className="sm-tag-counter"> ({userPrefs.modalidades?.length ?? 0}/{MAX_MODALITIES})</span>
                            </p>

                            <div className="sm-tag-row">
                                {ALL_MODALITIES.map(mod => {
                                    const selecionado = userPrefs.modalidades?.includes(mod);
                                    const limite = !selecionado && (userPrefs.modalidades?.length ?? 0) >= MAX_MODALITIES;
                                    return (
                                        <button key={mod} className={`sm-tag ${selecionado ? "sm-tag--active" : ""} ${limite ? "sm-tag--disabled" : ""}`} onClick={() => toggleMyModality(mod)} disabled={limite}>
                                            {mod}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="sm-toggle-row">
                                <div className="sm-toggle-info">
                                    <span className="sm-toggle-name">Modo incógnito</span>
                                    <span className="sm-toggle-desc">Seu perfil não aparece para outros</span>
                                </div>
                                <button className={`sm-switch ${incognito ? "sm-switch--on" : ""}`} onClick={() => setIncognito(!incognito)} />
                            </div>
                        </div>
                    )}

                    {activeTab === "fighters" && (
                        <div className="sm-panel">

                            <p className="sm-section-label">Preferências de lutador</p>

                            <EstadoCidadeSelector
                                estado={fighterPrefs.estado}
                                cidade={fighterPrefs.cidade}
                                onEstadoChange={(e) => setFighterPrefs(prev => ({ ...prev, estado: e }))}
                                onCidadeChange={(c) => setFighterPrefs(prev => ({ ...prev, cidade: c }))}
                            />

                            <div>
                                <p>Peso máximo</p>
                                <div className="sm-range-row">
                                    <input type="range" min={5} max={200} value={fighterPrefs.peso} onChange={(e) => setFighterPrefs(prev => ({ ...prev, peso: Number(e.target.value) }))} className="sm-range" />
                                    <span className="sm-range-val">{fighterPrefs.peso} KG</span>
                                </div>
                            </div>

                            <p className="sm-section-label">
                                Modalidades preferidas
                                <span className="sm-tag-counter"> ({fighterPrefs.modalidades.length}/{MAX_MODALITIES})</span>
                            </p>

                            <div className="sm-tag-row">
                                {ALL_MODALITIES.map(mod => {
                                    const selecionado = fighterPrefs.modalidades.includes(mod);
                                    const limite = !selecionado && fighterPrefs.modalidades.length >= MAX_MODALITIES;
                                    return (
                                        <button key={mod} className={`sm-tag ${selecionado ? "sm-tag--active" : ""} ${limite ? "sm-tag--disabled" : ""}`} onClick={() => toggleFighterModality(mod)} disabled={limite}>
                                            {mod}
                                        </button>
                                    );
                                })}
                            </div>

                        </div>
                    )}
                </div>

                <div className="sm-footer">
                    <button className="sm-btn-save" onClick={handleSave}>Salvar Preferências</button>
                </div>

            </div>
        </div>
    );
};

export default UserModal;