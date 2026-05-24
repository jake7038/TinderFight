require("dotenv").config({quiet: true});
const express = require('express')
const app = express()
const host = 'localhost'
const porta = 3000
                
app.listen (porta, host, () => {
console.log('Conectado ao Servidor')
})

