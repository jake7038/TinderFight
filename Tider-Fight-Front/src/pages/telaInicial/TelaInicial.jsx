import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import "./login.css";

export function TelaInicial() {
  const nav = useNavigate();

  const goHome = () => {
    nav("/lutadores");
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
            <button className="btn secondary">Login</button>
          </div>
          <button className="btn secondary">Cadastre-se Agora</button>
        </div>
      </div>
    </div>
  );
}
