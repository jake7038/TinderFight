const { darLike } = require("../services/matchService");
const conversaService = require("../services/serviceConversa");


async function darLikeController(req, res) {
  try {
    const idUsuarioLogado = req.user.id;
    const { id_usuario_alvo } = req.body;

    if (!id_usuario_alvo) {
      return res
        .status(400)
        .json({ mensagem: "O campo id_usuario_alvo é obrigatório." });
    }

    if (idUsuarioLogado === Number(id_usuario_alvo)) {
      return res
        .status(400)
        .json({ mensagem: "Não é possível dar like em si mesmo." });
    }

    const resultado = await darLike(idUsuarioLogado, id_usuario_alvo);

    if (resultado.match) {
        const conversa = await conversaService.criarConversa(id_usuario_alvo,idUsuarioLogado);
        return res.status(201).json({ mensagem: "É um match!", match: true, conversa: conversa });
    }

    return res
      .status(200)
      .json({ mensagem: resultado.mensagem ?? "Like registrado.", match: false });
  } catch (error) {
    console.error("Erro no controller de fight:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = { darLikeController };