const knexConfig = require("../../knexfile");
const db = require("knex")(knexConfig.development);

const TABLE = "preferencias";

async function criarPreferenciaService(dados) {
  try {
    const modalidadesString = JSON.stringify(dados.modalidade);

    const resultado = await db(TABLE)
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
    console.error("Erro ao acessar a preferencia de lutador: ", error);
    throw new Error(
      "Falha crítica ao persistir as preferências na base de dados.",
    );
  }
}

async function listarPreferenciasService(idPreferencia) {
  try {
    const preferencias = await db(TABLE)
      .where("id_preferencia", idPreferencia)
      .select("*");

    return preferencias;
  } catch (error) {
    console.error("Erro ao ler as preferencias de lutador: ", error);
    throw new Error(
      "Não foi possível buscar as preferencias de lutador na base de dados.",
    );
  }
}

async function atualizarPreferenciasService(idPreferencia, dados) {
  try {
    const dadosParaAtualizar = {};

    if (dados.img) dadosParaAtualizar.img = dados.img;
    if (dados.cidade) dadosParaAtualizar.cidade = dados.cidade;
    if (dados.estado) dadosParaAtualizar.estado = dados.estado;
    if (dados.modalidade) {
      dadosParaAtualizar.modalidades = JSON.stringify(dados.modalidade);
    }
    if (dados.peso) dadosParaAtualizar.peso = dados.peso;

    const resultado = await db(TABLE)
      .where("id_preferencia", idPreferencia)
      .update(dadosParaAtualizar)
      .returning("*");

    if (resultado.length === 0) {
      throw new Error(
        "Preferencia de lutador não encontrada para atualização.",
      );
    }

    return resultado[0];
  } catch (error) {
    console.error("Erro ao atualizar a preferencia de lutador: ", error);
    throw new Error(error.message);
  }
}

async function deletarPreferenciasService(idPreferencia) {
  try {
    const resultado = await db(TABLE)
      .where("id_preferencia", idPreferencia)
      .del();

    if (resultado === 0) {
      throw new Error("Preferencia de lutador não encontrada para exclusão.");
    }

    return resultado;
  } catch (error) {
    console.error("Erro ao deletar a preferencia de lutador: ", error);
    throw new Error(error.message);
  }
}

module.exports = {
  criarPreferenciaService,
  listarPreferenciasService,
  atualizarPreferenciasService,
  deletarPreferenciasService,
};
