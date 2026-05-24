/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("lutadores", (table) => {
    table.increments("id_lutador").primary();
    table.string("nome").notNullable();
    table.string("cidade").notNullable();
    table.string("estado").notNullable();
    table.string("img"); // (link)
    table.float("peso").notNullable();

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
  return knex.schema.dropTable("lutadores");
};
