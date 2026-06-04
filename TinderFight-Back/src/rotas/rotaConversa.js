const express = require("express");
const conversaController = require("../controllers/controllerConversa");
const autenticarToken = require("../middleware/autentication");
const router = express.Router();


router.get("/",  autenticarToken , conversaController.listarConversas);

router.get("/:id", autenticarToken, conversaController.buscarConversaPorId);

router.post("/", autenticarToken, conversaController.criarConversa);

router.delete("/:id", autenticarToken, conversaController.deletarConversa);

module.exports = router;
