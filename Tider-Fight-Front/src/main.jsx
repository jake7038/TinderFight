import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { TelaInicial } from "./pages/telaInicial/TelaInicial";
import { Principal } from "./pages/principal/principal";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/tela-principal" element={<Principal />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
