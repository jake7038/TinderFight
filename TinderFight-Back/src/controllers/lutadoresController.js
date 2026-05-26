const { criarLutadorService } = require("../services/lutadoresService");

async function criarLutadorController(req, res) {
  try {
    const dados = req.body;

    const novoLutador = awaitcriarLutadorService(dados);

    return res.status(201).json(novoLutador);
  } catch (error) {
    console.error("Erro no Controller de lutadores: ", error);
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = {
  criarLutadorController,
};
