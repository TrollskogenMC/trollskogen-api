exports.up = function(knex) {
  return knex.schema.table("races", (table) => {
    table.enu("type", ["player", "horse", "pig", "elytra"]);
  });
};

exports.down = function() {};
