exports.up = function(knex, Promise) {
  return knex.schema.table("race_points", (table) => {
    table.dropColumns("spawn_world", "spawn_pitch", "spawn_yaw");
    table.string("location_world").notNullable();
    table.float("location_pitch").notNullable();
    table.float("location_yaw").notNullable();
  });
};

exports.down = function(knex, Promise) {};
