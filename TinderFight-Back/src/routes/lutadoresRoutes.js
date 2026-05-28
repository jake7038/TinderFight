const express = require("express");

const {
  criarLutadorController,
  listarLutadoresController,
  atualizarLutadorController,
  deletarLutadorController,
} = require("../controllers/lutadoresController");

const router = express.Router();

router.post("/", criarLutadorController);
router.get("/", listarLutadoresController);
router.patch("/:id", atualizarLutadorController);
router.delete("/:id", deletarLutadorController);

module.exports = router;
