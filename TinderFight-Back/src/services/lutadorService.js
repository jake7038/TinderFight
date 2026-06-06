const database = require("../database/export");

const TABLE = "lutadores";

async function criarLutadorService(dados) {
  try {
    const modalidadesString = JSON.stringify(dados.modalidades);

    const existente = await database("lutadores")
      .where("id_usuario", dados.id_usuario)
      .first();

    if (existente) {
      const resultado = await database("lutadores")
        .where("id_usuario", dados.id_usuario)
        .update({
          nome: dados.nome,
          cidade: dados.cidade,
          estado: dados.estado,
          img: dados.img,
          peso: dados.peso,
          modalidades: modalidadesString,
        })
        .returning("*");
      return resultado[0];
    }

    const resultado = await database("lutadores")
      .insert({
        id_usuario: dados.id_usuario,
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
    console.error("Erro ao criar o dado de lutador: ", error);
    throw new Error("Não foi possível criar o lutador no banco de dados.");
  }
}


async function listarLutadoresService(idUsuario) {
  try {
    const lutadores = await database(TABLE)
      .select("*")
      .whereNot("id_usuario", idUsuario); 
    return lutadores;
  } catch (error) {
    console.error("Erro ao ler os lutadores: ", error);
    throw new Error("Não foi possível buscar os lutadores na base de dados.");
  }
}

async function atualizarLutadorService(idLutador, dados) {
  try {
    const dadosParaAtualizar = {};

    if (dados.nome) dadosParaAtualizar.nome = dados.nome;
    if (dados.cidade) dadosParaAtualizar.cidade = dados.cidade;
    if (dados.estado) dadosParaAtualizar.estado = dados.estado;
    if (dados.peso) dadosParaAtualizar.peso = dados.peso;
    if (dados.img) dadosParaAtualizar.img = dados.img;

    if (dados.modalidade) {
      dadosParaAtualizar.modalidades = JSON.stringify(dados.modalidade);
    }

    const resultado = await database(TABLE)
      .where("id_lutador", idLutador)
      .update(dadosParaAtualizar)
      .returning("*");

    if (resultado.length === 0) {
      throw new Error("Lutador não encontrado para atualização.");
    }

    return resultado[0];
  } catch (error) {
    console.error("Erro ao atualizar o dado de lutador: ", error);
    throw new Error(error.message);
  }
}

async function deletarLutadorService(id_usuario) {
  try {
    const resultado = await database(TABLE).where("id_usuario", id_usuario).del();

    if (resultado === 0) {
      throw new Error("Lutador não encontrado para exclusão.");
    }

    return "lutador deletado";
  } catch (error) {
    console.error("Erro ao deletar o lutador: ", error);
    throw new Error(error.message);
  }
}

module.exports = {
  criarLutadorService,
  listarLutadoresService,
  atualizarLutadorService,
  deletarLutadorService,
};
