import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

//import "./TelaInicial.css";

export function TelaInicial() {
  const nav = useNavigate();

  const goHome = () => {
    nav("/tela-principal");
  };

  const goCadastro = () => {
    nav("/cadastro");
  };

  const goLogin = () => {
    nav("/login");
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <div className="content">
          <img
            src="src/assets/logo_clubedaluta_semfundo.png"
            alt="Tinder da Luta"
            width="300"
            height="auto"
            className="logo"
          />

          <div className="buttons">
            <button className="btn primary" onClick={goHome}>
              Entre na Arena
            </button>
            <button className="btn secondary" onClick={goLogin}>
              Login
            </button>
          </div>
          <button className="btn secondary" onClick={goCadastro}>
            Cadastre-se Agora
          </button>
        </div>
      </div>
    </div>
  );
}
