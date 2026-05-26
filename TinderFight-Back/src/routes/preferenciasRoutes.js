const express = require("express");

const {
  criarPreferenciaController,
} = require("../controllers/preferenciasController");

const router = express.Router();

router.post("/", criarPreferenciaController);

module.exports = router;
