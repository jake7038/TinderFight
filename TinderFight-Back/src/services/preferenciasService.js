const knexConfig = require("../../knexfile");
const db = require("knex")(knexConfig.development);

async function criarPreferenciaService(dados) {
  try {
    const modalidadesString = JSON.stringify(dados.modalidade);

    const resultado = await db("preferencias")
      .insert({
        id_usuario: dados.userId,
        img: dados.img,
        cidade: dados.cidade,
        estado: dados.estado,
        peso: dados.peso,
        modalidades: modalidadesString,
      })
      .returning("*");

    return resultado[0];
  } catch (error) {
    console.error("Erro ao acessar o dado de lutador: ", error);
    throw new Error(
      "Falha crítica ao persistir as preferências na base de dados.",
    );
  }
}

module.exports = {
  criarPreferenciaService,
};
