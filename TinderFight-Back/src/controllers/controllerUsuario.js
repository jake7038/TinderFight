const {
    criarUsuario,
    buscarUsuario,
    atualizarUsuario,
    deletarUsuario,

} = require("../services/serviceUsuario.js");

async function criarcontrollerUsuario(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "E-mail e senha sao obrigatorios." });
  }

  try {
    const user = await criarUsuario({ email, senha });
    return res.status(201).json(user);
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

async function atualizarcontrollerUsuario(req, res) {
  const { id } = req.user;
  const { email, senha } = req.body;
 
  if (!email && !senha) {
    return res.status(400).json({ mensagem: "Informe ao menos email ou senha para atualizar." });
  }
 
  try {
    await atualizarUsuario(id, { email, senha });
    return res.status(200).json({ mensagem: "Usuário atualizado com sucesso." });
  } catch (error) {
    return res.status(error.status ?? 500).json({ mensagem: error.message });
  }
}
 
async function deletarcontrollerUsuario(req, res) {
  const { id } = req.user;
  try {
    await deletarUsuario(id);
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