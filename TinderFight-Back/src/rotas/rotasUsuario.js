const express = require("express");
const autenticarToken = require("../middleware/autentication");
const router = express.Router();
const {
  criarcontrollerUsuario,
  buscarcontrollerUsuario,
} = require("../controllers/controllerUsuario");

router.post("/", criarcontrollerUsuario);
router.get("/", autenticarToken, buscarcontrollerUsuario);
router.put("/", autenticarToken,);
router.delete("/", autenticarToken,);

module.exports = router;