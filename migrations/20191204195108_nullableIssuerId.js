exports.up = async (knex) => {
  await knex.schema.alterTable("bans", async (table) => {
    await table
      .integer("issued_by")
      .nullable()
      .alter();
  });
};
exports.down = (knex) =>
  knex.schema.alterTable("bans", (table) => {
    table
      .integer("issued_by")
      .notNullable()
      .alter();
  });
