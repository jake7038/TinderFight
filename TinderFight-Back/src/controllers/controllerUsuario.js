const {
  criarUsuario,
  buscarUsuario,
} = require("../services/serviceUsuario.js");

async function criarcontrollerUsuario(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "E-mail e senha sao obrigatorios." });
  }

  try {
    await criarUsuario({ email, senha });
    return res.status(201).json({ mensagem: "Usuario criado com sucesso." });
  } catch (error) {
    return res.status(error.status ?? 500).json({ mensagem: error.message });
  }
}

async function buscarcontrollerUsuario(req, res) {
  const {id} = req.user;
  try {
    const usuario = await buscarUsuario(id);
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(error.status ?? 500).json({ mensagem: error.message });
  }
}


module.exports = {
  criarcontrollerUsuario,
  buscarcontrollerUsuario,
};