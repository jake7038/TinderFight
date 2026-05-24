/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("mensagem", (table) => {
    table.increments("id_mensagem").primary();

    table
      .integer("id_conversa")
      .unsigned()
      .references("id_conversa")
      .inTable("conversa")
      .onDelete("CASCADE");

    table.string("texto_mensagem").notNullable();
    table.integer("sender").notNullable();

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("mensagem");
};
