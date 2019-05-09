exports.up = async (knex) => {
  return knex.schema.alterTable("users", (t) => {
    t.unique("minecraft_uuid");
  });
};

exports.down = async (knex) => {
  return knex.schema.alterTable("users", (t) => {
    t.dropUnique("minecraft_uuid");
  });
};
