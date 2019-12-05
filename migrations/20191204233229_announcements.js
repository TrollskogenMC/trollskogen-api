exports.up = async function(knex) {
  await knex.schema.createTable("announcements", (table) => {
    table.increments();
    table.string("name", 32).notNullable();
    table.text("text").notNullable();
    table.unique("name");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("announcements");
};
