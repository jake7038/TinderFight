import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../redux/hookers"
import { lutadoresSelectors, removerLutador } from "../../redux/slices/lutadorSlice"
import { fetchLutadores } from '../../redux/requisicoes/lutadorThunk'
import { useState, useEffect } from 'react'
import { criarConversa } from '../../redux/requisicoes/conversasThunk'
import UserModal from '../../modal/userModal/userModal'
import "./principal.css"
import { logout } from '../../redux/slices/usuarioSlice'

export function Principal() {
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const usuario = useAppSelector(state => state.usuario)

    const goConversas = () => nav("/conversas")

    const lutadores = useAppSelector(lutadoresSelectors.selectAll)

    const next = () => {
        if (!lutadores[0]) return
        dispatch(removerLutador(lutadores[0].id_lutador))
    }

    const match = () => {
        if (!lutadores[0]) return
        dispatch(criarConversa({ id_usuario2: String(lutadores[0].id_usuario) }))
        next()
    }

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const Gologout = () => {
        dispatch(logout())
        nav("/")
    }

    useEffect(() => {
        dispatch(fetchLutadores())
    }, [dispatch])

    return (
        <div className="principal">
            <header className="header">
                <img onClick={Gologout} className='logout_image' src="/logout.png" alt="logout" />
                <div className='hearder_center'>
                    <img className='header_img' src="src/assets/Choose your fighter in flames 1.png" alt="TinderFight" />
                </div>
                <div className="header-perfil" onClick={openModal}>
                    <img src="/lutador.png" alt="perfil" />
                </div>
            </header>

            <div
                className="card"
                style={{ backgroundImage: lutadores[0]?.img ? `url(${lutadores[0].img})` : 'none' }}
            >
                {!lutadores[0] ? (
                    <p className="carregando">
                        Encontrando os melhores lutadores na sua área <span className="dots"></span>
                    </p>
                ) : (
                    <>
                        <h2 className="name">{lutadores[0].nome}</h2>
                        <div className="place_fighter">
                            <p>
                                <img src="/pontogps.png" alt="" />
                                {lutadores[0].cidade}, {lutadores[0].estado}
                            </p>
                            <div className="category">
                                {lutadores[0].modalidades.map((mod: string) => (
                                    <p key={mod}>{mod}</p>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="choice">
                <div className="nop" onClick={next}>
                    <div className="circle">
                        <img src="/x.png" alt="não" />
                    </div>
                </div>
                <div className="yes" onClick={match}>
                    <div className="circle">
                        <img src="/mira.png" alt="match" />
                    </div>
                </div>
            </div>

            <footer>
                <div>
                    <div>
                        <img src="/glove.png" alt="" />
                        <p>Swap</p>
                    </div>
                    <div onClick={goConversas}>
                        <img src="/chat.png" alt="" />
                        <p>Chat</p>
                    </div>
                    <div onClick={openModal}>
                        <img src="/lutador.png" alt="" />
                        <p>Perfil do Lutador</p>
                    </div>
                </div>
            </footer>

            <UserModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}