const express = require("express");
const autenticarToken = require("../middleware/autentication");
const router = express.Router();
const {
    criarcontrollerUsuario,
    buscarcontrollerUsuario,
    atualizarcontrollerUsuario,
    deletarcontrollerUsuario
} = require("../controllers/controllerUsuario");

router.post("/", criarcontrollerUsuario);
router.get("/", autenticarToken, buscarcontrollerUsuario);
router.patch("/", autenticarToken, atualizarcontrollerUsuario);
router.delete("/", autenticarToken,deletarcontrollerUsuario);

module.exports = router;