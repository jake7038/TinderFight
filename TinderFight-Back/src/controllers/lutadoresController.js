const {
  criarLutadorService,
  listarLutadoresService,
  atualizarLutadorService,
  deletarLutadorService,
} = require("../services/lutadoresService");
const { atualizarLutadorService } = require("../services/lutadorService");

async function criarLutadorController(req, res) {
  try {
    const dados = req.body;

    const novoLutador = await criarLutadorService(dados);

    return res.status(201).json(novoLutador);
  } catch (error) {
    console.error("Erro no Controller de lutadores (criar lutadores): ", error);
    return res.status(500).json({ mensagem: error.message });
  }
}

async function listarLutadoresController(req, res) {
  try {
    const listaLutadores = await listarLutadoresService();

    return res.status(200).json(listaLutadores);
  } catch (error) {
    console.error("Erro no Controller de lutadores (listar lutadores):", error);
    return res.status(500).json({ mensagem: error.message });
  }
}

async function atualizarLutadorController(req, res) {
  try {
    const dadosLutador = req.body;
    const idLutador = req.params.id;

    const lutadorAtualizado = await atualizarLutadorService(
      idLutador,
      dadosLutador,
    );

    return res.status(200).json(lutadorAtualizado);
  } catch (error) {
    console.error(
      "Erro no Controller de lutadores (atualizar lutador):",
      error,
    );
    return res.status(500).json({ mensagem: error.message });
  }
}

async function deletarLutadorController(req, res) {
  try {
    const idLutador = req.params.id;

    const resultado = await deletarLutadorService(idLutador);

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Erro no Controller de lutadores (deletar lutador):", error);
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = {
  criarLutadorController,
  listarLutadoresController,
  atualizarLutadorController,
  deletarLutadorController,
};
