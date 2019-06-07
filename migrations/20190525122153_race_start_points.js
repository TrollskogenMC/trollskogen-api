exports.up = (knex) => {
  return knex.schema.createTable("race_start_points", (table) => {
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
    table.float("location_pitch").notNullable();
    table.float("location_yaw").notNullable();
    table.string("location_world").notNullable();

    table.unique(["race_id", "position"]);
    table.unique([
      "race_id",
      "location_x",
      "location_y",
      "location_z",
      "location_world"
    ]);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("race_start_points");
};
