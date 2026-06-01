/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("usuarios", (table) => {
    table.increments("id_usuario").primary();
    table.string("email").unique().notNullable();
    table.string("senha").notNullable(); // IMPORTANTE: ver como armazenar de forma segura

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("usuarios");
};
