const express = require("express");

const {
  criarLutadorController,
} = require("../controllers/lutadoresController");

const router = express.Router();

router.post("/", criarLutadorController);

module.exports = router;
