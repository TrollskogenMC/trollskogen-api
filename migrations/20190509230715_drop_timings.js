exports.up = function(knex, Promise) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("created_at");
    table.dropColumn("updated_at");
  });
};

exports.down = function(knex, Promise) {};
