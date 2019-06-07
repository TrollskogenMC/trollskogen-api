exports.up = (knex) => {
  return knex.schema.createTable("race_points", (table) => {
    table.increments().primary();
    table
      .integer("race_id", 36)
      .unsigned()
      .notNullable();
    table
      .foreign("race_id")
      .references("races.id")
      .onDelete("CASCADE");
    table
      .integer("position")
      .unsigned()
      .notNullable();
    table.integer("location_x").notNullable();
    table.integer("location_y").notNullable();
    table.integer("location_z").notNullable();
    table
      .integer("radius")
      .unsigned()
      .notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("race_points");
};
