exports.up = (knex) => {
  return knex.schema.table("verify_tokens", (table) => {
    table.timestamps();
  });
};

exports.down = (knex) => {
  return knex.schema.table("verify_tokens", (table) => {
    table.dropColumn("created_at");
    table.dropColumn("updated_at");
  });
};
