exports.up = async (knex) => {
  await knex.schema.table("users", (t) => {
    t.dropColumn("verify_token");
  });
  return knex.schema.table("users", async (t) => {
    t.string("verify_token", 6)
      .unique()
      .nullable();
    t.datetime("verify_token_created").nullable();
  });
};

exports.down = async (knex) => {};
