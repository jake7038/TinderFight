const express = require("express");
const router = express.Router();
const conversaController = require("../controllers/conversaController");
const autenticarToken = require("../middleware/autentication");

// GET /conversas — lista todas as conversas do usuário autenticado
router.get("/",  autenticarToken , conversaController.listarConversas);

// GET /conversas/:id — busca uma conversa por ID (somente se o usuário fizer parte dela)
router.get("/:id", autenticarToken, conversaController.buscarConversaPorId);

// POST /conversas — cria uma nova conversa entre o usuário autenticado e outro usuário
router.post("/", autenticarToken, conversaController.criarConversa);

// DELETE /conversas/:id — deleta uma conversa (somente se o usuário fizer parte dela)
router.delete("/:id", autenticarToken, conversaController.deletarConversa);

module.exports = router;
