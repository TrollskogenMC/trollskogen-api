exports.up = function(knex, Promise) {
  return knex.schema.table("race_points", (table) => {
    table.string("spawn_world").notNullable();
    table.float("spawn_pitch").notNullable();
    table.float("spawn_yaw").notNullable();
  });
};

exports.down = function(knex, Promise) {};
