const database = require("../database/export");


const TABLE = "preferencias";

async function criarPreferenciaService(dados) {
  try {
    const modalidadesString = JSON.stringify(dados.modalidades);

    const resultado = await database(TABLE)
      .insert({
        id_usuario: dados.id_usuario,
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

async function listarPreferenciasService(id_preferencia) {
  try {
    const preferencias = await database(TABLE)
      .where("id_usuario", id_preferencia)
      .select("*");

    return preferencias;
  } catch (error) {
    console.error("Erro ao ler as preferencias de lutador: ", error);
    throw new Error(
      "Não foi possível buscar as preferencias de lutador na base de dados.",
    );
  }
}

async function atualizarPreferenciasService(id_usuario, dados) {
  try {
    const dadosParaAtualizar = {};
    if (dados.cidade) dadosParaAtualizar.cidade = dados.cidade;
    if (dados.estado) dadosParaAtualizar.estado = dados.estado;
    if (dados.modalidades) {
        dadosParaAtualizar.modalidades = JSON.stringify(dados.modalidades);
    }
    if (dados.peso) dadosParaAtualizar.peso = dados.peso;

    const resultado = await database(TABLE)
      .where("id_usuario", id_usuario)
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
    const resultado = await database(TABLE)
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
