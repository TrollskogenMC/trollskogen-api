exports.up = async (knex) => {
  await knex.schema.alterTable("ongoingquests", async (table) => {
    await table.dropUnique("user_id");
    await table.unique("id");
  });
};
exports.down = (knex) =>
  knex.schema.alterTable("ongoingquests", (table) => {
    table.unique("user_id");
  });
