require("dotenv").config({quiet: true});
const express = require('express')
const app = express()
const host = process.env.LOCAL_HOST
const porta =process.env.SERVER_PORT

const rotaConversa = require("./src/rotas/rotaConversa");

app.use(express.json());

app.use("/conversa", rotaConversa);
                
app.listen (porta, host, () => {
console.log('Servidor rodando na porta: ' + porta)
})

