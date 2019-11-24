import util from "util";

export default function makeServerDb({ makeDb }) {
  return Object.freeze({
    findAllBans,
    findActiveBans,
    findAllUsers,
    findUserByTokenOrDiscordId,
    updateVerifiedUser,
    createOrUpdateUserWithToken
  });

  async function findAllBans() {
    const db = makeDb();
    return db
      .select([
        "bans.id as ban_id",
        "bans.issued_date as issued_date",
        "bans.reason as ban_reason",
        "bans.expiry_date as expiry_date",
        "banned_user.id as banned_user_id",
        "banned_user.last_seen_as as banned_user_name",
        "issued_user.id as issued_user_id",
        "issued_user.last_seen_as as issued_user_name"
      ])
      .table("bans")
      .innerJoin("users as banned_user", "banned_user.id", "bans.user_id")
      .innerJoin("users as issued_user", "issued_user.id", "bans.issued_by");
  }

  async function findActiveBans() {
    const db = makeDb();
    return db
      .select([
        "bans.id as ban_id",
        "bans.issued_date as issued_date",
        "bans.reason as ban_reason",
        "bans.expiry_date as expiry_date",
        "banned_user.id as banned_user_id",
        "banned_user.last_seen_as as banned_user_name",
        "issued_user.id as issued_user_id",
        "issued_user.last_seen_as as issued_user_name"
      ])
      .table("bans")
      .innerJoin("users as banned_user", "banned_user.id", "bans.user_id")
      .innerJoin("users as issued_user", "issued_user.id", "bans.issued_by")
      .whereRaw("bans.expiry_date is null or bans.expiry_date >= now()");
  }

  async function findAllUsers() {
    const db = makeDb();
    return db.select().table("users");
  }

  async function findUserByTokenOrDiscordId({ token, discordUserId, trx }) {
    const db = makeDb();
    const users = await db
      .select()
      .transacting(trx)
      .from("users")
      .where({ verify_token: token })
      .orWhere({ discord_user_id: discordUserId });
    if (users.length === 0) {
      return null;
    }
    return users[0];
  }

  async function updateVerifiedUser({ token, date, discordUserId, trx }) {
    const db = makeDb();
    return db("users")
      .transacting(trx)
      .where({ verify_token: token })
      .update({
        is_verified: true,
        verify_token_date: date,
        verify_token: null,
        discord_user_id: discordUserId
      });
  }

  async function createOrUpdateUserWithToken({
    minecraftUserId,
    lastSeenAs,
    token
  }) {
    const db = makeDb();

    const now = new Date();
    const insert = db("users")
      .insert({
        minecraft_uuid: minecraftUserId,
        verify_token: token,
        verify_token_created: now,
        last_seen_as: lastSeenAs
      })
      .toString();

    const update = db("users")
      .update({
        verify_token: token,
        verify_token_created: now,
        last_seen_as: lastSeenAs
      })
      .whereRaw(
        `users.minecraft_uuid = '${minecraftUserId}' AND users.is_verified = false`
      )
      .toString();

    const query = util.format(
      "%s ON CONFLICT (minecraft_uuid) DO UPDATE SET %s",
      insert,
      update.replace(/^update\s.*\sset\s/i, "")
    );
    const result = await db.raw(query);
    return result.rowCount;
  }
}
