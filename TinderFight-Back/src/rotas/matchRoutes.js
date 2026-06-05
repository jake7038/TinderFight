const express = require("express");
const router = express.Router();
const { darLikeController } = require("../controllers/matchController");
const autenticarToken = require("../middleware/autentication");

// POST /match — registra um like e cria conversa automaticamente se houver match
router.post("/", autenticarToken, darLikeController);

module.exports = router;
