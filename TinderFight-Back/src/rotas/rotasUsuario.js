const express = require("express");
const router = express.Router();
const autenticarToken = require("../middlewares/autentication");
const {
  criarcontrollerUsuario,
  buscarcontrollerUsuario,
} = require("../controllers/controllerUsuario");

router.post("/", criarcontrollerUsuario);
router.get("/", autenticarToken, buscarcontrollerUsuario);
router.put("/", autenticarToken,);
router.delete("/", autenticarToken,);

module.exports = router;