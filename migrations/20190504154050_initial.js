exports.up = (knex) => {
  return knex.schema.createTable("verify_tokens", (table) => {
    table.increments();
    table
      .string("discord_user_id", 255)
      .unique()
      .notNullable();
    table
      .string("token", 36)
      .unique()
      .notNullable();
    table.timestamps();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("verify_tokens");
};
