exports.up = async (knex) => {
  await knex("races")
    .where({ type: null })
    .update({
      type: "player"
    });
  return knex.schema.table("races", async (t) => {
    await t.dropColumn("type");
    t.enu("type", ["player", "horse", "pig", "elytra"]).notNullable();
  });
};

exports.down = async (knex) => {};
