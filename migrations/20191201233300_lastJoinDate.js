exports.up = async function(knex) {
  await knex.schema.table(
    "users",
    async (table) => await table.timestamp("last_join_date")
  );
};

exports.down = async function(knex) {
  await knex.schema.table("users", async (table) => {
    await table.dropColumn("last_join_date");
  });
};
