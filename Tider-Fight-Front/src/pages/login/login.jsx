import { useNavigate } from 'react-router-dom'

import './login.css'

export function Login(){
  const nav = useNavigate()

  const goHome = () => {
    nav("/lutadores")
  }
  
    return(
        <div className="login-container">
      <div className="overlay">
        <div className="content">
          
            <img src="src/assets/Fighting_spirit_in_flames-removebg-preview 1.png" alt="Tinder da Luta" className="logo"/>

          <div className="buttons">
            <button className="btn primary" onClick={goHome} >Entre na Arena</button>
            <button className="btn secondary">Cadastre Agora</button>
          </div>
        </div>
      </div>
    </div>
    )
}
