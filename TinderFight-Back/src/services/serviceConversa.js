const database = require("../database/export");

const TABLE = "conversa";

async function listarConversas(idUsuario) {
    const conversas = await database(TABLE)
        .where("id_usuario1", idUsuario)
        .orWhere("id_usuario2", idUsuario);

    const resultado = await Promise.all(
        conversas.map(async (conversa) => {
        const matchId =
            conversa.id_usuario1 === idUsuario
            ? conversa.id_usuario2
            : conversa.id_usuario1;

        const lutadorMatch = await database("lutadores")
            .where("id_usuario", matchId)
            .select("nome", "img")
            .first();

        return {
            id: String(conversa.id_conversa),
            usuarioId: String(idUsuario),
            matchId: String(matchId),
            matchNome: lutadorMatch?.nome ?? "Lutador",
            image: lutadorMatch?.img ?? "",
            lastMessage: conversa.ultimamensagem ?? "",
        };
        })
    );

    return resultado;
}

async function buscarConversaPorId(idConversa, idUsuario) {
    const conversa = await database(TABLE)
    .where("id_conversa", idConversa)
    .andWhere(function () {
    this.where("id_usuario1", idUsuario).orWhere("id_usuario2", idUsuario);
    })
    .first();
    return conversa || null;
}

async function buscarConversaEntreUsuarios(idUsuario1, idUsuario2) {
  return database(TABLE)
    .where(function () {
      this.where("id_usuario1", idUsuario1).andWhere("id_usuario2", idUsuario2);
    })
    .orWhere(function () {
      this.where("id_usuario1", idUsuario2).andWhere("id_usuario2", idUsuario1);
    })
    .first();
}

async function criarConversa(idUsuario1, idUsuario2) {
    const existente = await buscarConversaEntreUsuarios(idUsuario1, idUsuario2);
    if (existente) return existente;

    const [id] = await database(TABLE)
    .insert({ id_usuario1: idUsuario1, id_usuario2: idUsuario2 })
    .returning("id_conversa");

    return buscarConversaPorId(id?.id_conversa ?? id, idUsuario1);
}
 
async function deletarConversa(idConversa, idUsuario) {
  const conversa = await buscarConversaPorId(idConversa, idUsuario);
  if (!conversa) return null;
 
  await database(TABLE).where("id_conversa", idConversa).delete();
  return conversa;
}
 
module.exports = {
  listarConversas,
  buscarConversaPorId,
  buscarConversaEntreUsuarios,
  criarConversa,
  deletarConversa,
};
