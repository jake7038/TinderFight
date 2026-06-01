const express = require("express");
const router = express.Router();
const conversaController = require("../controlers/controllerConversa");
const autenticarToken = require("../middleware/autentication");

router.get("/",  autenticarToken , conversaController.listarConversas);

router.get("/:id", autenticarToken, conversaController.buscarConversaPorId);

router.post("/", autenticarToken, conversaController.criarConversa);

router.delete("/:id", autenticarToken, conversaController.deletarConversa);

module.exports = router;
