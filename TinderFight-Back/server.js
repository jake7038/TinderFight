const express = require("express");
const lutadoresRoutes = require("./src/routes/lutadoresRoutes");
require("dotenv").config({quiet: true});
const express = require('express')
const app = express()
const host = process.env.LOCAL_HOST
const porta =process.env.SERVER_PORT

app.use(express.json());
const rotaConversa = require("./src/rotas/rotaConversa");
app.use("/lutadores", lutadoresRoutes);
app.use("/conversa", rotaConversa);
                
app.listen (porta, host, () => {
console.log('Servidor rodando na porta: ' + porta)
})




