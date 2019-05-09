exports.up = async (knex) => {
  await knex.schema.table("users", (table) => {
    table
      .string("verify_token", 5)
      .unique()
      .nullable();
  });
  return knex.schema.dropTable("verify_tokens");
};

exports.down = async (knex) => {
  return knex.schema.table("users", (table) => {
    table.dropColumn("verify_token");
  });
};
