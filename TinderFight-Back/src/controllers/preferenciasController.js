const {
  criarPreferenciaService,
  listarPreferenciasService,
  atualizarPreferenciasService,
  deletarPreferenciasService,
} = require("../services/preferenciasService");

async function criarPreferenciaController(req, res) {
  try {
    const dados = req.body;

    const novaPreferencia = await criarPreferenciaService(dados);

    return res.status(201).json(novaPreferencia);
  } catch (error) {
    console.error("Erro no Controller de preferências (criar):", error);
    return res.status(500).json({ mensagem: error.message });
  }
}

async function listarPreferenciasController(req, res) {
  try {
    const idPreferencia = req.params.id;

    const preferencias = await listarPreferenciasService(idPreferencia);

    return res.status(200).json(preferencias);
  } catch (error) {
    console.error("Erro no Controller de preferências (listar):", error);
    return res.status(500).json({ mensagem: error.message });
  }
}

async function atualizarPreferenciasController(req, res) {
  try {
    const dados = req.body;
    const idPreferencia = req.params.id;

    const preferenciaAtualizada = await atualizarPreferenciasService(
      idPreferencia,
      dados,
    );

    return res.status(200).json(preferenciaAtualizada);
  } catch (error) {
    console.error("Erro no Controller de preferências (atualizar):", error);
    return res.status(500).json({ mensagem: error.message });
  }
}

async function deletarPreferenciasController(req, res) {
  try {
    const idPreferencia = req.params.id;

    const resultado = await deletarPreferenciasService(idPreferencia);

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Erro no Controller de preferências (deletar):", error);
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = {
  criarPreferenciaController,
  listarPreferenciasController,
  atualizarPreferenciasController,
  deletarPreferenciasController,
};
