const {
  criarUsuario,
  buscarUsuario,
  atualizarUsuario,
  deletarUsuario,
} = require("../services/serviceUsuario");

async function criarcontrollerUsuario(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios." });
  }

  try {
    const usuario = await criarUsuario({ email, senha });
    return res.status(201).json({ mensagem: "Usuário criado com sucesso.", usuario });
  } catch (error) {
    return res.status(error.status ?? 500).json({ mensagem: error.message });
  }
}

async function buscarcontrollerUsuario(req, res) {
  const { id_usuario } = req.user;

  try {
    const usuario = await buscarUsuario(id_usuario);
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(error.status ?? 500).json({ mensagem: error.message });
  }
}

async function atualizarcontrollerUsuario(req, res) {
  const { id_usuario } = req.user;
  const dados = req.body;


  try {
    const usuario = await atualizarUsuario(id_usuario, dados);
    return res.status(200).json({ mensagem: "Usuário atualizado.", usuario });
  } catch (error) {
    return res.status(error.status ?? 500).json({ mensagem: error.message });
  }
}


async function deletarcontrollerUsuario(req, res) {
  const { id_usuario } = req.user;


  try {
    await deletarUsuario(id_usuario);
    return res.status(200).json({ mensagem: "Usuário deletado com sucesso." });
  } catch (error) {
    return res.status(error.status ?? 500).json({ mensagem: error.message });
  }
}

module.exports = {
  criarcontrollerUsuario,
  buscarcontrollerUsuario,
  atualizarcontrollerUsuario,
  deletarcontrollerUsuario,
};