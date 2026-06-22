const { autenticarUsuario } = require("../services/loginService");

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios." });
  }

  try {
    const resultado = await autenticarUsuario({ email, senha });
    return res.status(200).json( resultado );
  } catch (error) {
    return res.status(error.status ?? 500).json({ mensagem: error.message });
  }
}

module.exports = { login };