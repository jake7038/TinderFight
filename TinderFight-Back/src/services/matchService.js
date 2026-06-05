const database = require("../database/export");

const TABLE = "fight";
const TABLE_CONVERSA = "conversa";

async function darLike(idUsuarioLogado, idUsuarioAlvo) {
  // Verifica se o alvo já deu like no usuário logado antes
  const likeInvertido = await database(TABLE)
    .where("id_usuario1", idUsuarioAlvo)
    .andWhere("id_usuario2", idUsuarioLogado)
    .first();

  if (likeInvertido) {
    // Já existe like do alvo — é um match! cria a conversa
    const conversaExistente = await database(TABLE_CONVERSA)
      .where(function () {
        this.where("id_usuario1", idUsuarioAlvo).andWhere(
          "id_usuario2",
          idUsuarioLogado
        );
      })
      .orWhere(function () {
        this.where("id_usuario1", idUsuarioLogado).andWhere(
          "id_usuario2",
          idUsuarioAlvo
        );
      })
      .first();

    if (!conversaExistente) {
      await database(TABLE_CONVERSA).insert({
        id_usuario1: likeInvertido.id_usuario1,
        id_usuario2: likeInvertido.id_usuario2,
      });
    }

    return { match: true };
  }

  // Verifica se o usuário logado já deu like antes (evita duplicata)
  const likeJaExiste = await database(TABLE)
    .where("id_usuario1", idUsuarioLogado)
    .andWhere("id_usuario2", idUsuarioAlvo)
    .first();

  if (likeJaExiste) {
    return { match: false, mensagem: "Like já registrado." };
  }

  // Primeiro like — cria entrada com usuário logado como usuario1
  await database(TABLE).insert({
    id_usuario1: idUsuarioLogado,
    id_usuario2: idUsuarioAlvo,
  });

  return { match: false };
}

module.exports = { darLike };