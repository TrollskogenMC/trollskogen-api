exports.up = async function(knex) {
  await knex.schema.createTable("chat", (table) => {
    table.increments();
    table.integer("user_id").notNullable();
    table.text("message").notNullable();
    table.timestamp("posted");

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");
  });
};

exports.down = async function(knex) {
  knex.schema.table("chat", async (table) => {
    await table.dropForeign("user_id");
  });
  await knex.schema.dropTable("chat");
};
