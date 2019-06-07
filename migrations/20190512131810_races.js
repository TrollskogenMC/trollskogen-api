exports.up = (knex) => {
  return knex.schema.createTable("races", (table) => {
    table.increments().primary();
    table
      .string("name", 36)
      .notNullable()
      .unique();
    table.string("display_name").notNullable();
    table
      .boolean("is_enabled")
      .notNullable()
      .defaultTo(true);
    table.integer("spawn_x").notNullable();
    table.integer("spawn_y").notNullable();
    table.integer("spawn_z").notNullable();
    table.float("spawn_pitch").notNullable();
    table.float("spawn_yaw").notNullable();
    table.datetime("created_at", 32).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("races");
};
