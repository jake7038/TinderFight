/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("conversa", (table) => {
    table.increments("id_conversa").primary();

    table
      .integer("id_usuario1")
      .unsigned()
      .references("id_usuario")
      .inTable("usuarios")
      .onDelete("CASCADE");

    table
      .integer("id_usuario2")
      .unsigned()
      .references("id_usuario")
      .inTable("usuarios")
      .onDelete("CASCADE");


    table.string("ultimamensagem");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("conversa");
};
