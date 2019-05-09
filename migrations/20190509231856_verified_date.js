exports.up = async (knex) => {
  return knex.schema.table("users", async (t) => {
    t.datetime("verify_token_date").nullable();
  });
};

exports.down = async (knex) => {};
