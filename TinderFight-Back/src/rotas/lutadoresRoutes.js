const express = require("express");
const autenticarToken = require("../middleware/autentication");

const {
  criarLutadorController,
  listarLutadoresController,
  atualizarLutadorController,
  deletarLutadorController,
} = require("../controllers/lutadoresController");

const router = express.Router();

router.post("/", autenticarToken, criarLutadorController);
router.get("/", autenticarToken, listarLutadoresController);
router.patch("/:id", autenticarToken, atualizarLutadorController);
router.delete("/:id", autenticarToken, deletarLutadorController);

module.exports = router;
