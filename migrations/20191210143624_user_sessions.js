exports.up = async function(knex) {
  await knex.schema.createTable("user_sessions", (table) => {
    table.increments();
    table.integer("user_id").notNullable();
    table.timestamp("start").notNullable();
    table.timestamp("end");
    table.string("ip").notNullable();

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");
  });
  await knex.schema.alterTable("chat", (table) => {
    table
      .timestamp("posted")
      .notNullable()
      .alter();
  });
};

exports.down = async function(knex) {
  knex.schema.table("user_sessions", async (table) => {
    await table.dropForeign("user_id");
  });
  await knex.schema.dropTable("user_sessions");
  knex.schema.alterTable("chat", (table) => {
    table
      .timestamp("posted")
      .nullable()
      .alter();
  });
};
