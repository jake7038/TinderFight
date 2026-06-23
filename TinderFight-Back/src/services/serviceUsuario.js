const bcrypt = require("bcrypt");
const database = require("../database/export");
const jwt = require("jsonwebtoken");

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

    const novoUsuario = await database(TABLE).where({ email }).first();

    const token = jwt.sign(
        { id: novoUsuario.id_usuario },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    const { senha: _, ...usuarioSemSenha } = novoUsuario;

    return {
        mensagem: "Cadastro realizado com sucesso!",
        token,
        usuario: usuarioSemSenha
    };
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

async function atualizarUsuario(id, { email, senha }) {
  const usuario = await database(TABLE).where("id_usuario", id).first();
 
  if (!usuario) {
    const erro = new Error("Usuário não encontrado.");
    erro.status = 404;
    throw erro;
  }
 
  if (email && email !== usuario.email) {
    const emailEmUso = await database(TABLE).where({ email }).first();
    if (emailEmUso) {
      const erro = new Error("E-mail já cadastrado.");
      erro.status = 409;
      throw erro;
    }
  }
 
  const dados = {};
  if (email) dados.email = email;
  if (senha) dados.senha = await bcrypt.hash(senha, 10);
 
  await database(TABLE).where("id_usuario", id).update(dados);
}
 
async function deletarUsuario(id) {
  const usuario = await database(TABLE).where("id_usuario", id).first();
 
  if (!usuario) {
    const erro = new Error("Usuário não encontrado.");
    erro.status = 404;
    throw erro;
  }
 
  await database(TABLE).where("id_usuario", id).delete();
}

module.exports = {
    criarUsuario,
    buscarUsuario,
    atualizarUsuario,
    deletarUsuario,
};
