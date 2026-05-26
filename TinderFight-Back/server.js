const express = require("express");

const lutadoresRoutes = require("./src/routes/lutadoresRoutes");

const app = express();

app.use(express.json());

app.use("/lutadores", lutadoresRoutes);

const PORTA = 8000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando perfeitamente na porta ${PORTA}`);
});
