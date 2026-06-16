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
router.get("/", autenticarToken, listarPreferenciasController);
router.patch("/", autenticarToken, atualizarPreferenciasController);
router.delete("/:id", autenticarToken, deletarPreferenciasController);

module.exports = router;
