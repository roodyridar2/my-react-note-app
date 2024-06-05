/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.string("email").notNullable();
    table
      .string("img")
      .defaultTo(
        "https://thumbs.dreamstime.com/z/profile-icon-male-avatar-portrait-casual-person-silhouette-face-flat-design-vector-46846328.jpg?ct=jpeg"
      );
    table.boolean("isAdmin").defaultTo("false");
    table.timestamps(true, true); // created_at and updated_at timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
