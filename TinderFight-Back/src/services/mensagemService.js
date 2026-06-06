const database = require("../database/export");
const TABLE = "mensagem";
const TABLE_CONVERSA = "conversa";

async function usuarioPertenceAConversa(idConversa, idUsuario) {
  const conversa = await database(TABLE_CONVERSA)
    .where("id_conversa", idConversa)
    .andWhere(function () {
      this.where("id_usuario1", idUsuario).orWhere("id_usuario2", idUsuario);
    })
    .first();

  return !!conversa;
}

async function listarMensagens(idConversa, idUsuario) {
  const pertence = await usuarioPertenceAConversa(idConversa, idUsuario);
  if (!pertence) return null;

  return database(TABLE)
    .where("id_conversa", idConversa)
    .orderBy("created_at", "asc");
}

async function buscarMensagemPorId(idMensagem, idUsuario) {
  const mensagem = await database(TABLE)
    .where("id_mensagem", idMensagem)
    .first();

  if (!mensagem) return null;

  const pertence = await usuarioPertenceAConversa(
    mensagem.id_conversa,
    idUsuario
  );
  if (!pertence) return null;

  return mensagem;
}

async function criarMensagem(idConversa, idUsuario, texto) {
  const pertence = await usuarioPertenceAConversa(idConversa, idUsuario);
  if (!pertence) return null;

  const [id] = await database(TABLE)
    .insert({
      id_conversa: idConversa,
      texto_mensagem: texto,
      sender: idUsuario,
    })
    .returning("id_mensagem");

  await database("conversa")
    .where("id_conversa", idConversa)
    .update({ ultimamensagem: texto });

  return database(TABLE)
    .where("id_mensagem", id?.id_mensagem ?? id)
    .first();
}

async function editarMensagem(idMensagem, idUsuario, novoTexto) {
  const mensagem = await database(TABLE)
    .where("id_mensagem", idMensagem)
    .first();

  if (!mensagem) return null;

  if (mensagem.sender !== idUsuario) return null;

  await database(TABLE)
    .where("id_mensagem", idMensagem)
    .update({ texto_mensagem: novoTexto });

  return database(TABLE).where("id_mensagem", idMensagem).first();
}

async function deletarMensagem(idMensagem, idUsuario) {
  const mensagem = await database(TABLE)
    .where("id_mensagem", idMensagem)
    .first();

  if (!mensagem) return null;

  if (mensagem.sender !== idUsuario) return null;

  await database(TABLE).where("id_mensagem", idMensagem).delete();
  return mensagem;
}

module.exports = {
  listarMensagens,
  buscarMensagemPorId,
  criarMensagem,
  editarMensagem,
  deletarMensagem,
};