exports.up = async (knex) => {
  await knex.schema.alterTable("ongoingquests", async (table) => {
    await table
      .string("quest_id")
      .notNullable()
      .alter();
  });
};
exports.down = (knex) =>
  knex.schema.alterTable("ongoingquests", (table) => {
    table.string("quest_id").alter();
  });
