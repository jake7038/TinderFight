import { useNavigate } from 'react-router-dom'
import LoginModal from '../../modal/loginModal/loginModal'
import CadastraModal from '../../modal/cadastraModal/cadastraModal'
import { useState } from 'react'
import './login.css'

export function Login(){
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showCadastraModal, setShowCadastraModal] = useState(false);

    

    return(
        <div className="login-container">
            <div className="overlay">
                <div className="content">

                    <img src="src/assets/Fighting_spirit_in_flames-removebg-preview 1.png" alt="Tinder da Luta" className="logo"/>

                    <div className="buttons">
                        <button className="btn primary" onClick={() => setShowLoginModal(true)} >Entre na Arena</button>
                        <button className="btn secondary" onClick={() => setShowCadastraModal(true)}>Cadastre Agora</button>
                    </div>
                </div>
            </div>
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}/>
            <CadastraModal isOpen={showCadastraModal} onClose={() => setShowCadastraModal(false)} />
            
        </div>
    )
}
