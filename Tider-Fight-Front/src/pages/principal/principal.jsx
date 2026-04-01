import "./principal.css"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

export function Principal() { 
    
    const lutador = useSelector(state => state.lutador.lutador)
    

    return(
        <div className="principal">
            <header className="header">
                <img src="/User.png" alt="" />
                <img className="imagem_header" src="src/assets/Choose your fighter in flames 1.png" alt="" />
                <img src="/Map.png" alt="" />
            </header>
            <div className="card">
                    <h2 className="name">{lutador.nome}</h2>
                    <div className="place_fighter">
                        <p> <img src="/pontogps.png" alt="" /> {lutador.cidade}, {lutador.estado}</p>
                        <div className="category">
                            {lutador.modalidade.map(mod => (
                            <p key={mod}>{mod}</p>
                            ))}
                        </div>
                    </div>
                    
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
                        <img src="/chat.png" alt="" />
                        <p>Chat</p>
                    </div>
                    
                    <div>
                        <img src="/lutador.png" alt="" />
                        <p>Perfil do Lutador</p>
                    </div>

                    <div>
                        <img src="/historico.png" alt="" />
                        <p>Histórico</p>
                    
                    </div>
                
                </div>
            </footer>

        </div>


    )
}