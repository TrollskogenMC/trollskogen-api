const knex = require("./knex");
const uuid = require("uuid");
const crypto = require("crypto");
const util = require("util");

module.exports = async (minecraftUUID, lastSeenAs) => {
  const token = crypto.randomBytes(3).toString("hex");

  const now = new Date();
  const insert = knex("users")
    .insert({
      minecraft_uuid: minecraftUUID,
      verify_token: token,
      verify_token_created: now,
      last_seen_as: lastSeenAs
    })
    .toString();
  const update = knex("users")
    .update({
      verify_token: token,
      verify_token_created: now,
      last_seen_as: lastSeenAs
    })
    .whereRaw(`users.minecraft_uuid = '${minecraftUUID}'`);
  const query = util.format(
    "%s ON CONFLICT (minecraft_uuid) DO UPDATE SET %s",
    insert.toString(),
    update.toString().replace(/^update\s.*\sset\s/i, "")
  );
  await knex.raw(query);
  console.log("Created token " + token);
  return token;
};
