exports.up = (knex) => {
  return knex.schema.table("verify_tokens", (table) => {
    table.dropColumn("discord_user_id");
    table
      .string("user_id", 36)
      .unique()
      .notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.table("verify_tokens", (table) => {
    table.dropColumn("user_id");
    table
      .string("token", 36)
      .unique()
      .notNullable();
  });
};
