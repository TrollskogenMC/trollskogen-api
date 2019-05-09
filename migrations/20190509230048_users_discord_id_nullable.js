exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", (t) => {
    t.string("discord_user_id", 32)
      .nullable()
      .alter();
  });
};

exports.down = function(knex, Promise) {};
