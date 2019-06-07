exports.up = function(knex, Promise) {
  return knex.schema.table("races", (table) => {
    table
      .boolean("is_editing")
      .notNullable()
      .defaultTo(true);
  });
};

exports.down = function(knex, Promise) {};
