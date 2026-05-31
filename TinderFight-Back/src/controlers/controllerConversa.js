const conversaService = require("../services/serviceConversa");
 
async function listarConversas(req, res) {
  try {
    const idUsuario = req.user.id;
 
    const conversas = await conversaService.listarConversas(idUsuario);
 
    return res.status(200).json(conversas);
  } catch (error) {
    console.error("Erro ao listar conversas:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}
 
async function buscarConversaPorId(req, res) {
  try {
    const idUsuario = req.user.id;
    const { id } = req.params;
 
    const conversa = await conversaService.buscarConversaPorId(id, idUsuario);
 
    if (!conversa) {
      return res
        .status(404)
        .json({ mensagem: "Conversa não encontrada ou sem permissão." });
    }
 
    return res.status(200).json(conversa);
  } catch (error) {
    console.error("Erro ao buscar conversa:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}
 
async function criarConversa(req, res) {
  try {
    const idUsuario1 = req.user.id;
    const { id_usuario2 } = req.body;
 
    if (!id_usuario2) {
      return res
        .status(400)
        .json({ mensagem: "O campo id_usuario2 é obrigatório." });
    }
 
    if (idUsuario1 === Number(id_usuario2)) {
      return res
        .status(400)
        .json({ mensagem: "Não é possível criar uma conversa consigo mesmo." });
    }
 
    const conversa = await conversaService.criarConversa(
      idUsuario1,
      id_usuario2
    );
 
    return res.status(201).json(conversa);
  } catch (error) {
    console.error("Erro ao criar conversa:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}
 
async function deletarConversa(req, res) {
  try {
    const idUsuario = req.user.id;
    const { id } = req.params;
 
    const conversa = await conversaService.deletarConversa(id, idUsuario);
 
    if (!conversa) {
      return res
        .status(404)
        .json({ mensagem: "Conversa não encontrada ou sem permissão." });
    }
 
    return res
      .status(200)
      .json({ mensagem: "Conversa deletada com sucesso.", conversa });
  } catch (error) {
    console.error("Erro ao deletar conversa:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}
 
module.exports = {
  listarConversas,
  buscarConversaPorId,
  criarConversa,
  deletarConversa,
};
