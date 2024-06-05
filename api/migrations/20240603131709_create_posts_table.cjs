/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  //posts table
  return knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("content").nullable();
    table.integer("uid").unsigned().references("id").inTable("users").onDelete('CASCADE');;
    table.string("visibility").defaultTo("private");
    table
      .string("img")
      .defaultTo(
        "https://images.pexels.com/photos/596143/pexels-photo-596143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      );
    table.boolean("deleted").notNullable().defaultTo(false);

    table.timestamps(true, true); // created_at and updated_at timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};
