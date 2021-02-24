exports.up = async function(knex) {
  await knex.schema.createTable("ongoingquests", (table) => {
    table.increments();
    table.integer("user_id").notNullable();
    table.integer("quest_id").notNullable();
    table.string("name").notNullable();
    table.decimal("participation").notNullable();
    table.boolean("is_active").notNullable();

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");
    table.unique(["user_id"]);
  });
};

exports.down = async function(knex) {
  knex.schema.table("ongoingquests", async (table) => {
    await table.dropForeign("user_id");
  });
  await knex.schema.dropTable("ongoingquests");
};
