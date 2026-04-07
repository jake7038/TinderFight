import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from "../../redux/hookers"
import { useAppSelector } from "../../redux/hookers"
import { lutadoresSelectors } from "../../redux/slices/lutadorSlice"
import "./principal.css"

export function Principal() { 
    
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const goConversas = () => {
    
    nav("/conversas")
    }

    const lutador = useAppSelector(state => {
        const lutadores = lutadoresSelectors.selectAll(state)
        return lutadores[0]
    })


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
                    
                    <div>
                        <img src="/chat.png" alt="" onClick={ goConversas} />
                        <p>Chat</p>
                    </div>
                    
                    <div>
                        <img src="/lutador.png" alt="" />
                        <p>Perfil do Lutador</p>
                    </div>

                    
                
                </div>
            </footer>

        </div>


    )
}