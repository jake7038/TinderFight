const express = require("express");
const router = express.Router({ mergeParams: true });
const mensagemController = require("../controllers/controllerMensagem");
const autenticarToken = require("../middleware/autentication");

// GET /conversas/:idConversa/mensagens — lista todas as mensagens de uma conversa
router.get("/", autenticarToken, mensagemController.listarMensagens);

// GET /mensagens/:id — busca uma mensagem pelo ID
router.get("/:id", autenticarToken, mensagemController.buscarMensagemPorId);

// POST /conversas/:idConversa/mensagens — envia uma mensagem em uma conversa
router.post("/", autenticarToken, mensagemController.criarMensagem);

// PATCH /mensagens/:id — edita o texto de uma mensagem própria
router.patch("/:id", autenticarToken, mensagemController.editarMensagem);

// DELETE /mensagens/:id — deleta uma mensagem própria
router.delete("/:id", autenticarToken, mensagemController.deletarMensagem);

module.exports = router;