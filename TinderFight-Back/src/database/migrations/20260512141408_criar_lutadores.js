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
    table.string("img"); 
    table.float("peso").notNullable();
    table.jsonb("modalidades");
    table.integer("id_usuario").unsigned().references("id_usuario").inTable("usuarios").onDelete("CASCADE");

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
