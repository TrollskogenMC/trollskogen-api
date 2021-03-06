export default function makeServerDb({ makeDb }) {
  return Object.freeze({
    findActiveBans,
    findAllAnnouncements,
    findAllBans,
    findAllActiveOngoingQuests,
    findAllCompleteOngoingQuests,
    findAllTopCompleteOngoingQuests,
    findAllChat,
    findAllHomes,
    findAllOngoingQuests,
    findAllUsers,
    findAnnouncementById,
    findBanById,
    findBansByUserId,
    findOngoingQuestById,
    findHomeById,
    findHomesByUserId,
    findUserById,
    findUserByMinecraftId,
    findUserByTokenOrDiscordId,
    insertAnnouncement,
    insertBan,
    insertChat,
    insertHome,
    insertOngoingQuest,
    insertUser,
    insertUserSession,
    removeAnnouncement,
    removeHome,
    removeOngoingQuest,
    updateAnnouncement,
    updateBan,
    updateHome,
    updateOngoingQuest,
    updateUser,
    updateVerifiedUser
  });

  async function findAllBans() {
    const db = makeDb();
    return db
      .select([
        "bans.id as id",
        "bans.issued_date as issued_date",
        "bans.reason as reason",
        "bans.expiry_date as expiry_date",
        "bans.is_cancelled as is_cancelled",
        "banned_user.id as user_id",
        "banned_user.name as banned_user_name",
        "issued_user.id as issued_by",
        "issued_user.name as issued_user_name",
        "cancelled_user.id as cancelled_by",
        "cancelled_user.name as cancelled_user_name",
        "bans.cancelled_date"
      ])
      .table("bans")
      .innerJoin("users as banned_user", "banned_user.id", "bans.user_id")
      .leftJoin("users as issued_user", "issued_user.id", "bans.issued_by")
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
        "bans.id as id",
        "bans.issued_date as issued_date",
        "bans.reason as reason",
        "bans.expiry_date as expiry_date",
        "bans.is_cancelled as is_cancelled",
        "banned_user.id as user_id",
        "banned_user.name as banned_user_name",
        "issued_user.id as issued_by",
        "issued_user.name as issued_user_name",
        "cancelled_user.id as cancelled_by",
        "cancelled_user.name as cancelled_user_name",
        "bans.cancelled_date"
      ])
      .table("bans")
      .innerJoin("users as banned_user", "banned_user.id", "bans.user_id")
      .leftJoin("users as issued_user", "issued_user.id", "bans.issued_by")
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
        verify_date: date,
        verify_token: null
      });
  }

  async function findAllHomes() {
    const db = makeDb();
    const rows = await db
      .select([
        "homes.id as id",
        "homes.name as name",
        "homes.x as x",
        "homes.y as y",
        "homes.z as z",
        "homes.world as world",
        "homes.pitch as pitch",
        "homes.yaw as yaw",
        "homes.is_open as is_open",
        "homes.allow_commands as allow_commands",
        "home_user.id as user_id",
        "home_user.name as user_name"
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
    return { id, ...banInfo };
  }

  async function findUserByMinecraftId({ minecraftId }) {
    const db = makeDb();
    const [user] = await db
      .select()
      .from("users")
      .where({ minecraft_uuid: minecraftId });
    return user;
  }

  async function findOngoingQuestById({ id }) {
    const db = makeDb();
    const [ongoingquest] = await db
      .select([
        "ongoingquests.id as id",
        "ongoingquests.name as name",
        "ongoingquests.participation as participation",
        "ongoingquests.is_active as is_active",
        "ongoingquests_user.id as user_id",
        "ongoingquests_user.name as user_name",
        "ongoingquests.quest_id as quest_id",
        "ongoingquests.is_complete as is_complete",
        "ongoingquests.activated_on as activated_on",
        "ongoingquests.expires_on as expires_on"
      ])
      .from("ongoingquests")
      .innerJoin(
        "users as ongoingquests_user",
        "ongoingquests_user.id",
        "ongoingquests.user_id"
      )
      .where({ "ongoingquests.id": id });
    return ongoingquest;
  }

  async function findBanById({ id }) {
    const db = makeDb();
    const [ban] = await db
      .select([
        "bans.id as id",
        "bans.issued_date as issued_date",
        "bans.reason as reason",
        "bans.expiry_date as expiry_date",
        "bans.is_cancelled as is_cancelled",
        "banned_user.id as user_id",
        "banned_user.name as banned_user_name",
        "issued_user.id as issued_by",
        "issued_user.name as issued_user_name",
        "cancelled_user.id as cancelled_by",
        "cancelled_user.name as cancelled_user_name",
        "bans.cancelled_date"
      ])
      .from("bans")
      .innerJoin("users as banned_user", "banned_user.id", "bans.user_id")
      .leftJoin("users as issued_user", "issued_user.id", "bans.issued_by")
      .leftJoin(
        "users as cancelled_user",
        "cancelled_user.id",
        "bans.cancelled_by"
      )
      .where({ "bans.id": id });
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
        "bans.id as id",
        "bans.issued_date as issued_date",
        "bans.reason as reason",
        "bans.expiry_date as expiry_date",
        "bans.is_cancelled as is_cancelled",
        "banned_user.id as user_id",
        "banned_user.name as banned_user_name",
        "issued_user.id as issued_by",
        "issued_user.name as issued_user_name",
        "cancelled_user.id as cancelled_by",
        "cancelled_user.name as cancelled_user_name",
        "bans.cancelled_date"
      ])
      .from("bans")
      .innerJoin("users as banned_user", "banned_user.id", "bans.user_id")
      .leftJoin("users as issued_user", "issued_user.id", "bans.issued_by")
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
        "homes.id as id",
        "homes.name as name",
        "homes.x as x",
        "homes.y as y",
        "homes.z as z",
        "homes.world as world",
        "homes.pitch as pitch",
        "homes.yaw as yaw",
        "homes.is_open as is_open",
        "homes.allow_commands as allow_commands",
        "home_user.id as user_id",
        "home_user.name as user_name"
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
        "homes.id as id",
        "homes.name as name",
        "homes.x as x",
        "homes.y as y",
        "homes.z as z",
        "homes.world as world",
        "homes.pitch as pitch",
        "homes.yaw as yaw",
        "homes.is_open as is_open",
        "homes.allow_commands as allow_commands",
        "home_user.id as user_id",
        "home_user.name as user_name"
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
    return { id, ...homeInfo };
  }

  async function updateHome({ id, ...homeInfo }) {
    const db = makeDb();
    const modifiedRows = await db("homes")
      .where({ id })
      .update(homeInfo);
    if (modifiedRows > 0) {
      return homeInfo;
    }
    return {};
  }

  async function insertUser(userInfo) {
    const db = makeDb();
    const [id] = await db("users")
      .returning("id")
      .insert(userInfo);
    return { id, ...userInfo };
  }

  async function updateUser({ id, ...userInfo }) {
    const db = makeDb();
    const modifiedRows = await db("users")
      .where({ id })
      .update(userInfo);
    if (modifiedRows > 0) {
      return userInfo;
    }
    return {};
  }

  async function removeHome({ id }) {
    const db = makeDb();
    await db("homes")
      .where({ id })
      .delete();
  }

  async function updateBan({ id, ...banInfo }) {
    const db = makeDb();
    const modifiedRows = await db("bans")
      .where({ id })
      .update(banInfo);
    if (modifiedRows > 0) {
      return banInfo;
    }
    return {};
  }

  async function insertAnnouncement(announcementInfo) {
    const db = makeDb();
    const [id] = await db("announcements")
      .returning("id")
      .insert(announcementInfo);
    return { id, ...announcementInfo };
  }

  async function removeAnnouncement({ id }) {
    const db = makeDb();
    await db("announcements")
      .where({ id })
      .delete();
  }

  async function findAllAnnouncements() {
    const db = makeDb();
    return db.select().from("announcements");
  }

  async function findAnnouncementById({ id }) {
    const db = makeDb();
    const [announcement] = await db
      .select()
      .from("announcements")
      .where({ id });
    return announcement;
  }

  async function updateAnnouncement({ id, ...announcementInfo }) {
    const db = makeDb();
    const modifiedRows = await db("announcements")
      .where({ id })
      .update(announcementInfo);
    if (modifiedRows > 0) {
      return announcementInfo;
    }
    return {};
  }

  async function findAllChat() {
    const db = makeDb();
    return db
      .select(
        "chat.id as id",
        "chat.user_id as user_id",
        "chat.posted as posted",
        "chat.message as message",
        "users.name as name"
      )
      .from("chat")
      .innerJoin("users", "users.id", "user_id")
      .limit(100)
      .orderBy("posted", "desc");
  }

  async function insertChat(chatInfo) {
    const db = makeDb();
    const [id] = await db("chat")
      .returning("id")
      .insert(chatInfo);
    return { id, ...chatInfo };
  }

  async function insertUserSession(userSessionInfo) {
    const db = makeDb();
    const [id] = await db("user_sessions")
      .returning("id")
      .insert(userSessionInfo);
    return { id, ...userSessionInfo };
  }

  async function findAllOngoingQuests() {
    const db = makeDb();
    const rows = await db
      .select([
        "ongoingquests.id as id",
        "ongoingquests.name as name",
        "ongoingquests.participation as participation",
        "ongoingquests.is_active as is_active",
        "ongoingquests.activated_on as activated_on",
        "ongoingquests_user.id as user_id",
        "ongoingquests_user.name as user_name",
        "ongoingquests.quest_id as quest_id",
        "ongoingquests.is_complete as is_complete",
        "ongoingquests.expires_on as expires_on"
      ])
      .from("ongoingquests")
      .innerJoin(
        "users as ongoingquests_user",
        "ongoingquests_user.id",
        "ongoingquests.user_id"
      );
    return rows;
  }

  async function findAllActiveOngoingQuests() {
    const db = makeDb();
    const rows = await db
      .select([
        "ongoingquests.id as id",
        "ongoingquests.name as name",
        "ongoingquests.participation as participation",
        "ongoingquests.is_active as is_active",
        "ongoingquests.activated_on as activated_on",
        "ongoingquests_user.id as user_id",
        "ongoingquests_user.name as user_name",
        "ongoingquests.quest_id as quest_id",
        "ongoingquests.is_complete as is_complete",
        "ongoingquests.expires_on as expires_on"
      ])
      .from("ongoingquests")
      .innerJoin(
        "users as ongoingquests_user",
        "ongoingquests_user.id",
        "ongoingquests.user_id"
      )
      .where({ is_active: true });
    return rows;
  }

  async function findAllCompleteOngoingQuests() {
    const db = makeDb();
    const rows = await db
      .select([
        "ongoingquests.id as id",
        "ongoingquests.name as name",
        "ongoingquests.participation as participation",
        "ongoingquests.is_active as is_active",
        "ongoingquests.activated_on as activated_on",
        "ongoingquests_user.id as user_id",
        "ongoingquests_user.name as user_name",
        "ongoingquests.quest_id as quest_id",
        "ongoingquests.is_complete as is_complete",
        "ongoingquests.expires_on as expires_on"
      ])
      .from("ongoingquests")
      .innerJoin(
        "users as ongoingquests_user",
        "ongoingquests_user.id",
        "ongoingquests.user_id"
      )
      .where({ is_complete: true });
    return rows;
  }

  async function findAllTopCompleteOngoingQuests() {
    const db = makeDb();
    const rows = await db
      .select([
        "ongoingquests.id as id",
        "ongoingquests.name as name",
        "ongoingquests.participation as participation",
        "ongoingquests.is_active as is_active",
        "ongoingquests.activated_on as activated_on",
        "ongoingquests_user.id as user_id",
        "ongoingquests_user.name as user_name",
        "ongoingquests.quest_id as quest_id",
        "ongoingquests.is_complete as is_complete",
        "ongoingquests.expires_on as expires_on"
      ])
      .from("ongoingquests")
      .innerJoin(
        "users as ongoingquests_user",
        "ongoingquests_user.id",
        "ongoingquests.user_id"
      )
      .where({ is_complete: true });

    const mappedRows = rows.map((row) => ({
      user_id: row.user_id,
      user_name: row.user_name,
      total_quests: 1
    }));

    const mergedRows = (mRows) => {
      const out = [];

      for (const entry of mRows) {
        const existingEnty = out.find((o) => o.user_id === entry.user_id);
        if (existingEnty) {
          existingEnty.total_quests = existingEnty.total_quests + 1;
        } else {
          out.push(entry);
        }
      }
      return out;
    };

    return mergedRows(mappedRows);
  }

  async function insertOngoingQuest(ongoingQuestInfo) {
    const db = makeDb();
    const [id] = await db("ongoingquests")
      .returning("id")
      .insert(ongoingQuestInfo);

    return { id, ...ongoingQuestInfo };
  }

  async function updateOngoingQuest({ id, ...ongoingQuestInfo }) {
    const db = makeDb();
    const modifiedRows = await db("ongoingquests")
      .where({ id })
      .update(ongoingQuestInfo);
    if (modifiedRows > 0) {
      return ongoingQuestInfo;
    }
    return {};
  }

  async function removeOngoingQuest({ id }) {
    const db = makeDb();
    await db("ongoingquests")
      .where({ id })
      .delete();
  }
}
