exports.up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments().primary();
    table.string("minecraft_uuid", 36).notNullable();
    table.string("last_seen_as", 32).notNullable();
    table
      .boolean("is_verified")
      .notNullable()
      .defaultTo(false);
    table
      .boolean("is_banned")
      .notNullable()
      .defaultTo(false);
    table.string("selected_effect").nullable();
    table.timestamps();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("users");
};
