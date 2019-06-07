exports.up = function(knex, Promise) {
  return knex.schema.table("races", (table) => {
    table.string("spawn_world").notNullable();
  });
};

exports.down = function(knex, Promise) {};
