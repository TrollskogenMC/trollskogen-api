import util from "util";

export default function makeServerDb({ makeDb }) {
  return Object.freeze({
    createOrUpdateUserWithToken,
    findActiveBans,
    findAllBans,
    findAllHomes,
    findAllUsers,
    findBanById,
    findBansByUserId,
    findHomeById,
    findHomesByUserId,
    findUserById,
    findUserByMinecraftId,
    findUserByTokenOrDiscordId,
    insertBan,
    insertHome,
    updateVerifiedUser
  });

  async function findAllBans() {
    const db = makeDb();
    return db
      .select([
        "bans.id as ban_id",
        "bans.issued_date as issued_date",
        "bans.reason as ban_reason",
        "bans.expiry_date as expiry_date",
        "bans.is_cancelled as is_cancelled",
        "banned_user.id as banned_user_id",
        "banned_user.last_seen_as as banned_user_name",
        "issued_user.id as issued_user_id",
        "issued_user.last_seen_as as issued_user_name",
        "cancelled_user.id as cancelled_user_id",
        "cancelled_user.last_seen_as as cancelled_user_name"
      ])
      .table("bans")
      .innerJoin("users as banned_user", "banned_user.id", "bans.user_id")
      .innerJoin("users as issued_user", "issued_user.id", "bans.issued_by")
      .leftJoin(
        "users as cancelled_user",
        "cancelled_user.id",
        "bans.cancelled_by"
      );
  }

  async function findActiveBans() {
    const db = makeDb();
    return db
      .select([
        "bans.id as ban_id",
        "bans.issued_date as issued_date",
        "bans.reason as ban_reason",
        "bans.expiry_date as expiry_date",
        "bans.is_cancelled as is_cancelled",
        "banned_user.id as banned_user_id",
        "banned_user.last_seen_as as banned_user_name",
        "issued_user.id as issued_user_id",
        "issued_user.last_seen_as as issued_user_name",
        "cancelled_user.id as cancelled_user_id",
        "cancelled_user.last_seen_as as cancelled_user_name"
      ])
      .table("bans")
      .innerJoin("users as banned_user", "banned_user.id", "bans.user_id")
      .innerJoin("users as issued_user", "issued_user.id", "bans.issued_by")
      .leftJoin(
        "users as cancelled_user",
        "cancelled_user.id",
        "bans.cancelled_by"
      )
      .whereRaw(
        "(bans.expiry_date is null or bans.expiry_date >= now()) and is_cancelled = false"
      );
  }

  async function findAllUsers() {
    const db = makeDb();
    const result = await db.raw(`
      SELECT u.*,
       bool_or(b.id IS NOT NULL
               AND (b.expiry_date IS NULL
                    OR b.expiry_date < now()) AND b.is_cancelled = false) AS is_banned
      FROM users u
      FULL JOIN bans b ON u.id = b.user_id
      GROUP BY u.id
    `);
    return result.rows;
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
        discord_user_id: discordUserId,
        is_verified: true,
        verify_token: null,
        verify_token_date: date
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
        last_seen_as: lastSeenAs,
        minecraft_uuid: minecraftUserId,
        verify_token: token,
        verify_token_created: now
      })
      .toString();

    const update = db("users")
      .update({
        last_seen_as: lastSeenAs,
        verify_token: token,
        verify_token_created: now
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

  async function findAllHomes() {
    const db = makeDb();
    const rows = await db
      .select([
        "homes.id as home_id",
        "homes.name as home_name",
        "homes.x as x",
        "homes.y as y",
        "homes.z as z",
        "homes.world as world",
        "homes.pitch as pitch",
        "homes.yaw as yaw",
        "homes.is_open as is_open",
        "homes.allow_commands as allow_commands",
        "home_user.id as home_user_id",
        "home_user.last_seen_as as home_user_name"
      ])
      .from("homes")
      .innerJoin("users as home_user", "home_user.id", "homes.user_id");
    return rows;
  }

  async function insertBan(banInfo) {
    const db = makeDb();
    const [id] = await db("bans")
      .returning("id")
      .insert(banInfo);
    return id;
  }

  async function findUserByMinecraftId({ minecraftId }) {
    const db = makeDb();
    const [user] = await db
      .select()
      .from("users")
      .where({ minecraft_uuid: minecraftId });
    return user;
  }

  async function findBanById({ id }) {
    const db = makeDb();
    const [ban] = await db
      .select([
        "bans.id as ban_id",
        "bans.issued_date as issued_date",
        "bans.reason as ban_reason",
        "bans.expiry_date as expiry_date",
        "bans.is_cancelled as is_cancelled",
        "banned_user.id as banned_user_id",
        "banned_user.last_seen_as as banned_user_name",
        "issued_user.id as issued_user_id",
        "issued_user.last_seen_as as issued_user_name",
        "cancelled_user.id as cancelled_user_id",
        "cancelled_user.last_seen_as as cancelled_user_name"
      ])
      .from("bans")
      .innerJoin("users as banned_user", "banned_user.id", "bans.user_id")
      .innerJoin("users as issued_user", "issued_user.id", "bans.issued_by")
      .leftJoin(
        "users as cancelled_user",
        "cancelled_user.id",
        "bans.cancelled_by"
      )
      .where({ id });
    return ban;
  }

  async function findUserById({ id }) {
    const db = makeDb();
    const [user] = await db
      .select()
      .from("users")
      .where({ id });
    return user;
  }

  async function findBansByUserId({ userId }) {
    const db = makeDb();
    const bans = await db
      .select([
        "bans.id as ban_id",
        "bans.issued_date as issued_date",
        "bans.reason as ban_reason",
        "bans.expiry_date as expiry_date",
        "bans.is_cancelled as is_cancelled",
        "banned_user.id as banned_user_id",
        "banned_user.last_seen_as as banned_user_name",
        "issued_user.id as issued_user_id",
        "issued_user.last_seen_as as issued_user_name",
        "cancelled_user.id as cancelled_user_id",
        "cancelled_user.last_seen_as as cancelled_user_name"
      ])
      .from("bans")
      .innerJoin("users as banned_user", "banned_user.id", "bans.user_id")
      .innerJoin("users as issued_user", "issued_user.id", "bans.issued_by")
      .leftJoin(
        "users as cancelled_user",
        "cancelled_user.id",
        "bans.cancelled_by"
      )
      .where({ user_id: userId });
    return bans;
  }

  async function findHomeById({ id }) {
    const db = makeDb();
    const [ban] = await db
      .select([
        "homes.id as home_id",
        "homes.name as home_name",
        "homes.x as x",
        "homes.y as y",
        "homes.z as z",
        "homes.world as world",
        "homes.pitch as pitch",
        "homes.yaw as yaw",
        "homes.is_open as is_open",
        "homes.allow_commands as allow_commands",
        "home_user.id as home_user_id",
        "home_user.last_seen_as as home_user_name"
      ])
      .from("homes")
      .innerJoin("users as home_user", "home_user.id", "homes.user_id")
      .where({ "homes.id": id });
    return ban;
  }

  async function findHomesByUserId({ userId }) {
    const db = makeDb();
    return db
      .select([
        "homes.id as home_id",
        "homes.name as home_name",
        "homes.x as x",
        "homes.y as y",
        "homes.z as z",
        "homes.world as world",
        "homes.pitch as pitch",
        "homes.yaw as yaw",
        "homes.is_open as is_open",
        "homes.allow_commands as allow_commands",
        "home_user.id as home_user_id",
        "home_user.last_seen_as as home_user_name"
      ])
      .from("homes")
      .innerJoin("users as home_user", "home_user.id", "homes.user_id")
      .where({ "homes.user_id": userId });
  }

  async function insertHome(homeInfo) {
    const db = makeDb();
    const [id] = await db("homes")
      .returning("id")
      .insert(homeInfo);
    return id;
  }
}
