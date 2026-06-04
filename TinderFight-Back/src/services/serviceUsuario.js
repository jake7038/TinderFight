const bcrypt = require("bcrypt");
const database = require("../database/export");

const TABLE = "usuarios";

async function criarUsuario({ email, senha }) {
  const usuarioExistente = await database(TABLE).where({ email }).first();
  if (usuarioExistente) {
    const erro = new Error("E-mail ja cadastrado.");
    erro.status = 409;
    throw erro;
  }

    const senhaHash = await bcrypt.hash(senha, 10);
    await database(TABLE).insert({ email, senha: senhaHash });
}

async function buscarUsuario(id_usuario) {
  const usuario = await database(TABLE)
    .where({ id_usuario })
    .select("id_usuario", "email", "created_at")
    .first();

  if (!usuario) {
    const erro = new Error("Usuario nao encontrado.");
    erro.status = 404;
    throw erro;
  }

  return usuario;
}

module.exports = { criarUsuario, buscarUsuario };