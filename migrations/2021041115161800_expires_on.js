exports.up = async (knex) => {
  await knex.schema.alterTable("ongoingquests", async (table) => {
    await table
      .string("expires_on")
      .nullable();
  });
};
exports.down = (knex) =>
  knex.schema.alterTable("ongoingquests", (table) => {
    table
      .string("expires_on")
      .nullable()
      .alter();
  });
