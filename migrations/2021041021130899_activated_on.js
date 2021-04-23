exports.up = async (knex) => {
  await knex.schema.alterTable("ongoingquests", async (table) => {
    await table
      .string("activated_on")
      .nullable();
  });
};
exports.down = (knex) =>
  knex.schema.alterTable("ongoingquests", (table) => {
    table
      .string("activated_on")
      .nullable()
      .alter();
  });
