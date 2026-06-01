const express = require("express");
const lutadoresRoutes = require("./src/routes/lutadoresRoutes");
require("dotenv").config({quiet: true});

const app = express()
const host = process.env.LOCAL_HOST
const porta =process.env.SERVER_PORT

const rotaConversa = require("./src/rotas/rotaConversa");
const rotaUsuario = require("./src/rotas/rotasUsuario");
const lutadoresRoutes = require("./src/routes/lutadoresRoutes");

app.use(express.json());
c

app.use("/lutadores", lutadoresRoutes);
app.use("/conversa", rotaConversa);
app.use("/usuario", rotaUsuario);

app.listen (porta, host, () => {
console.log('Servidor rodando na porta: ' + porta)
})




