/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("fight", (table) => {
    table.increments("id_fight").primary();

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

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("fight");
};
