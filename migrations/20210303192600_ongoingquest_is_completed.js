exports.up = async (knex) => {
  await knex.schema.alterTable("ongoingquests", async (table) => {
    await table.boolean("is_complete").notNullable();
  });
};
exports.down = (knex) =>
  knex.schema.alterTable("ongoingquests", (table) => {
    table.boolean("is_complete").nullable();
  });
