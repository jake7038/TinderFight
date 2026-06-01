const mensagemService = require("../services/mensagemService");

async function listarMensagens(req, res) {
  try {
    const idUsuario = req.user.id;
    const { idConversa } = req.params;

    const mensagens = await mensagemService.listarMensagens(
      idConversa,
      idUsuario
    );

    if (mensagens === null) {
      return res
        .status(403)
        .json({ mensagem: "Acesso negado a esta conversa." });
    }

    return res.status(200).json(mensagens);
  } catch (error) {
    console.error("Erro ao listar mensagens:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

async function buscarMensagemPorId(req, res) {
  try {
    const idUsuario = req.user.id;
    const { id } = req.params;

    const mensagem = await mensagemService.buscarMensagemPorId(id, idUsuario);

    if (!mensagem) {
      return res
        .status(404)
        .json({ mensagem: "Mensagem não encontrada ou sem permissão." });
    }

    return res.status(200).json(mensagem);
  } catch (error) {
    console.error("Erro ao buscar mensagem:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

async function criarMensagem(req, res) {
  try {
    const idUsuario = req.user.id;
    const { idConversa } = req.params;
    const { texto_mensagem } = req.body;

    if (!texto_mensagem || texto_mensagem.trim() === "") {
      return res
        .status(400)
        .json({ mensagem: "O campo texto_mensagem é obrigatório." });
    }

    const mensagem = await mensagemService.criarMensagem(
      idConversa,
      idUsuario,
      texto_mensagem.trim()
    );

    if (!mensagem) {
      return res
        .status(403)
        .json({ mensagem: "Acesso negado a esta conversa." });
    }

    return res.status(201).json(mensagem);
  } catch (error) {
    console.error("Erro ao criar mensagem:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

async function editarMensagem(req, res) {
  try {
    const idUsuario = req.user.id;
    const { id } = req.params;
    const { texto_mensagem } = req.body;

    if (!texto_mensagem || texto_mensagem.trim() === "") {
      return res
        .status(400)
        .json({ mensagem: "O campo texto_mensagem é obrigatório." });
    }

    const mensagem = await mensagemService.editarMensagem(
      id,
      idUsuario,
      texto_mensagem.trim()
    );

    if (!mensagem) {
      return res
        .status(404)
        .json({ mensagem: "Mensagem não encontrada ou sem permissão." });
    }

    return res.status(200).json(mensagem);
  } catch (error) {
    console.error("Erro ao editar mensagem:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

async function deletarMensagem(req, res) {
  try {
    const idUsuario = req.user.id;
    const { id } = req.params;

    const mensagem = await mensagemService.deletarMensagem(id, idUsuario);

    if (!mensagem) {
      return res
        .status(404)
        .json({ mensagem: "Mensagem não encontrada ou sem permissão." });
    }

    return res
      .status(200)
      .json({ mensagem: "Mensagem deletada com sucesso.", dados: mensagem });
  } catch (error) {
    console.error("Erro ao deletar mensagem:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = {
  listarMensagens,
  buscarMensagemPorId,
  criarMensagem,
  editarMensagem,
  deletarMensagem,
};