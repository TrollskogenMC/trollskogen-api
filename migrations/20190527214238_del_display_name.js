exports.up = function(knex) {
  return knex.schema.table("races", (table) => {
    table.dropColumn("display_name");
  });
};

exports.down = function() {};
