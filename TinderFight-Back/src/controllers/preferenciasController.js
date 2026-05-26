const { criarPreferenciaService } = require("../services/preferenciasService");

async function criarPreferenciaController(req, res) {
  try {
    const dados = req.body;

    const novaPreferencia = await criarPreferenciaService(dados);

    return res.status(201).json(novaPreferencia);
  } catch (error) {
    console.error("Erro no Controller de preferências:", error);
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = {
  criarPreferenciaController,
};
