exports.up = async (knex) => {
  await knex.schema.table("races", async (t) => {
    t.enu("type", ["player", "horse", "pig", "elytra"]);
  });
};

exports.down = async (knex) => {};
