const database = require("../database/export");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const TABLE = "usuarios";

async function autenticarUsuario({ email, senha }) {
    const usuario = await database(TABLE).where({ email }).first();

    if (!usuario) {
    const erro = new Error("E-mail ou senha inválidos.");
    erro.status = 401;
    throw erro;
    }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    const erro = new Error("E-mail ou senha inválidos.");
    erro.status = 401;
    throw erro;
  }

  const token = jwt.sign(
    { id: usuario.id_usuario },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return token;
}

module.exports = { autenticarUsuario };