exports.up = (knex) => {
  return knex.schema.table("users", (table) => {
    table
      .string("discord_user_id", 32)
      .unique()
      .notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.table("users", (table) => {
    table.dropColumn("discord_user_id");
  });
};
