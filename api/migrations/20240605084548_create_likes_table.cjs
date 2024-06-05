/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("likes", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete('CASCADE');;
    table.integer("post_id").unsigned().references("id").inTable("posts").onDelete('CASCADE');;
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("likes");
};
