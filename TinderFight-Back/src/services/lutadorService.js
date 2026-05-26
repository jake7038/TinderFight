const knexConfig = require("../../knexfile");
const db = require("knex")(knexConfig.development);

async function criarLutadorService(dados) {
  try {
    const modalidadesString = JSON.stringify(dados.modalidade);

    const resultado = await db("lutadores")
      .insert({
        id_usuario: dados.userId,
        nome: dados.nome,
        cidade: dados.cidade,
        estado: dados.estado,
        img: dados.img,
        peso: dados.peso,
        modalidades: modalidadesString,
      })
      .returning("*");
    return resultado[0];
  } catch (error) {
    console.error("Erro ao acessar o dado de lutador: ", error);
    throw new Error("Não foi possível criar o ltador no banco de dados.");
  }
}

module.exports = {
  criarLutadorService,
};
