import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from "../../redux/hookers"
import { useAppSelector } from "../../redux/hookers"
import { lutadoresSelectors } from "../../redux/slices/lutadorSlice"
import { fetchLutadores } from '../../redux/requisicoes/lutadorThunk'
import { useState, useEffect } from 'react'
import UserModal from '../../modal/userModal/userModal'
import "./principal.css"

export function Principal() { 
    
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const usuario = useAppSelector(state => state.usuario)

    const goConversas = () => {
    
    nav("/conversas")
    }

    const lutador = useAppSelector(state => {
        const lutadores = lutadoresSelectors.selectAll(state)
        return lutadores[0]
    })

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    useEffect(() => {
    dispatch(fetchLutadores(usuario.id))
    }, [dispatch])

    return(
        <div className="principal">
            <header className="header">
                <img src="/User.png" alt="" />
                <img className="imagem_header" src="src/assets/Choose your fighter in flames 1.png" alt="" />
                <img src="/Map.png" alt="" />
            </header>
            <div className="card" style={{backgroundImage: lutador?.img ? `url(${lutador.img})` : 'none' }} >

                {!lutador ? (
                    <p className="carregando">Encontrando os melhores lutadores na sua área <span className="dots"></span> </p>
                ) : (<>
                            <h2 className="name">{lutador.nome}</h2>
                        <div className="place_fighter">
                            <p> <img src="/pontogps.png" alt="" /> {lutador.cidade}, {lutador.estado}</p>
                            <div className="category">
                                {lutador.modalidade.map(mod => (
                                <p key={mod}>{mod}</p>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            
            </div>
            
            <div className="choice">
                    <div className="nop">
                        <div className="circle">
                            <img src="/x.png" alt="" />
                        </div>
                    </div>

                    <div className="yes">
                        <div className="circle">
                            <img src="/mira.png" alt="" />
                        </div>
                    </div>
            </div>
            
            <footer>
                <div>
                    
                    <div>
                        <img src="/glove.png" alt="" />
                        <p>Swap</p>
                    </div>
                    
                    <div onClick={ goConversas} >
                        <img src="/chat.png" alt=""  />
                        <p>Chat</p>
                    </div>
                    
                    <div onClick={openModal}>
                        <img src="/lutador.png" alt="" />
                        <p>Perfil do Lutador</p>
                    </div>

                    
                
                </div>
            </footer>
                
            <UserModal isOpen={isModalOpen} onClose={closeModal} onSave={() => null}></UserModal>

        </div>


    )
}