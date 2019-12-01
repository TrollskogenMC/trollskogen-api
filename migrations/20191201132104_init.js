exports.up = async function(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("minecraft_uuid", 36).notNullable();
    table.string("name", 32).notNullable();
    table.boolean("is_verified").notNullable();
    table.string("discord_user_id", 32);
    table.string("verify_token", 6);
    table.timestamp("verify_token_created");
    table.timestamp("verify_date");

    table.unique("minecraft_uuid");
    table.unique("discord_user_id");
    table.unique("verify_token");
  });

  await knex.schema.createTable("bans", (table) => {
    table.increments();
    table.integer("user_id").notNullable();
    table.timestamp("issued_date").notNullable();
    table.integer("issued_by").notNullable();
    table.string("reason").notNullable();
    table.timestamp("expiry_date");
    table.boolean("is_cancelled").notNullable();
    table.integer("cancelled_by");
    table.timestamp("cancelled_date");

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");
    table
      .foreign("issued_by")
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");
    table
      .foreign("cancelled_by")
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");
  });

  await knex.schema.createTable("homes", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.integer("user_id").notNullable();
    table.decimal("x").notNullable();
    table.decimal("y").notNullable();
    table.decimal("z").notNullable();
    table.string("world").notNullable();
    table.decimal("yaw").notNullable();
    table.decimal("pitch").notNullable();
    table.boolean("is_open").notNullable();
    table.boolean("allow_commands").notNullable();

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");
    table.unique(["name", "user_id"]);
  });
};

exports.down = async function(knex) {
  knex.schema.table("bans", async (table) => {
    await table.dropForeign("user_id");
    await table.dropForeign("issued_by");
    await table.dropForeign("cancelled_by");
  });
  await knex.schema.dropTable("bans");

  knex.schema.table("homes", async (table) => {
    await table.dropForeign("user_id");
  });
  await knex.schema.dropTable("homes");

  await knex.schema.dropTable("users");
};
