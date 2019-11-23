exports.up = function(knex, Promise) {
  return knex.schema.alterTable("race_points", (t) => {
    t.unique(["race_id", "position"]);
    t.unique(["race_id", "location_x", "location_y", "location_z"]);
  });
};

exports.down = function(knex, Promise) {};
