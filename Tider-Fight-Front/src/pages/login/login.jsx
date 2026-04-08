import { useNavigate } from 'react-router-dom'
import LoginModal from '../../modal/loginModal/loginModal'
import { useState } from 'react'
import './login.css'

export function Login(){
    const nav = useNavigate()
    const [showModal, setShowModal] = useState(false);

    const goPrincipal = () => {
        nav("/lutadores")
    }

    return(
        <div className="login-container">
            <div className="overlay">
                <div className="content">

                    <img src="src/assets/Fighting_spirit_in_flames-removebg-preview 1.png" alt="Tinder da Luta" className="logo"/>

                    <div className="buttons">
                        <button className="btn primary" onClick={() => setShowModal(true)} >Entre na Arena</button>
                        <button className="btn secondary" onClick={goPrincipal}>Cadastre Agora</button>
                    </div>
                </div>
            </div>
            <LoginModal isOpen={showModal} onClose={() => setShowModal(false)}
        onLogin={(email, password) => {
            console.log(email, password);
            setShowLogin(false);
        }}
        onRegister={() => console.log("cadastro")}
        />
        </div>
    )
}
