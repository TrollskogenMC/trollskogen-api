exports.up = async (knex) => {
  await knex.schema.alterTable("ongoingquests", async (table) => {
    table.increments();
    await table.boolean("is_complete").alter();
  });
};
exports.down = (knex) =>
  knex.schema.alterTable("ongoingquests", (table) => {
    table.boolean("is_complete").alter();
  });
