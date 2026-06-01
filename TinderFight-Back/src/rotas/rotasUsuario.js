const express = require("express");
const router = express.Router();
const autenticarToken = require("../middleware/autentication");
const {
  criarcontrollerUsuario,
  buscarcontrollerUsuario,
  atualizarcontrollerUsuario,
  deletarcontrollerUsuario,
} = require("../controlers/controllerUsuario");

router.post("/", criarcontrollerUsuario);
router.get("/", autenticarToken, buscarcontrollerUsuario);
router.put("/", autenticarToken, atualizarcontrollerUsuario);
router.delete("/", autenticarToken, deletarcontrollerUsuario);

module.exports = router;