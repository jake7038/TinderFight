const express = require("express");
const autenticarToken = require("../middleware/autentication");

const {
  criarPreferenciaController,
  listarPreferenciasController,
  atualizarPreferenciasController,
  deletarPreferenciasController,
} = require("../controllers/preferenciasController");

const router = express.Router();

router.post("/", autenticarToken, criarPreferenciaController);
router.get("/:id", autenticarToken, listarPreferenciasController);
router.patch("/:id", autenticarToken, atualizarPreferenciasController);
router.delete("/:id", autenticarToken, deletarPreferenciasController);

module.exports = router;
