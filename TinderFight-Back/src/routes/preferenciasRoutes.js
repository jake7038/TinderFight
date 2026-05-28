const express = require("express");

const {
  criarPreferenciaController,
  listarPreferenciasController,
  atualizarPreferenciasController,
  deletarPreferenciasController,
} = require("../controllers/preferenciasController");

const router = express.Router();

router.post("/", criarPreferenciaController);
router.get("/:id", listarPreferenciasController);
router.patch("/:id", atualizarPreferenciasController);
router.delete("/:id", deletarPreferenciasController);

module.exports = router;
