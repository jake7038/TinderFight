const express = require("express");
require("dotenv").config({quiet: true});
const cors = require('cors')
const lutadoresRoutes = require("./src/rotas/lutadoresRoutes");
const rotaConversa = require("./src/rotas/rotaConversa");
const rotaUsuario = require("./src/rotas/rotasUsuario");
const rotaLogin = require("./src/rotas/rotaLogin");
const rotaPreferencia = require("./src/rotas/preferenciasRoutes");
const rotaMensagem = require("./src/rotas/rotaMensagem");
const rotaMatch = require("./src/rotas/matchRoutes")
const app = express()

app.use(
    cors({
    origin: process.env.SeRVER_FRONT
    })
)
const host = process.env.LOCAL_HOST
const porta =process.env.SERVER_PORT
app.use(express.json());
app.use("/lutadores", lutadoresRoutes);
app.use("/login", rotaLogin);
app.use("/conversa", rotaConversa);
app.use("/preferencia", rotaPreferencia);
app.use("/mensagem", rotaMensagem);
app.use("/usuario", rotaUsuario);
app.use("/fight", rotaMatch)

                
app.listen (porta, host, () => {
console.log('Servidor rodando na porta: ' + porta)
})




