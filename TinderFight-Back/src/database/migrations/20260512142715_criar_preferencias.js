/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("preferencias", (table) => {
    table.increments("id_preferencia").primary();
    table.string("cidade").notNullable();
    table.string("estado").notNullable();
    table.integer("peso").notNullable(); // IMPORTANTE: avaliar pra ver se não é float

    // Para as modalidades, como no Postgres não existe 'array' simples de string
    // como no JSON, vamos salvar como um campo de texto ou JSON
    table.jsonb("modalidades");

    table
      .integer("id_usuario")
      .unsigned()
      .references("id_usuario")
      .inTable("usuarios")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("preferencias");
};
