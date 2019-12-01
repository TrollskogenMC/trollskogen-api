import makeUser from "../user/index.js";

export default function({ db }) {
  return async function({ id, ...changes }) {
    if (!id) {
      throw new Error("You must supply an id.");
    }

    const existing = await db.findUserById({
      id
    });

    if (!existing) {
      throw new RangeError("User not found.");
    }

    const user = makeUser({
      ...existing,
      ...changes
    });
    const updated = await db.updateUser({
      discord_user_id: user.getDiscordUserId(),
      id: user.getId(),
      is_verified: user.isVerified(),
      minecraft_uuid: user.getMinecraftUUID(),
      name: user.getName(),
      verify_date: user.getVerifyDate(),
      verify_token: user.getVerifyToken(),
      verify_token_created: user.getVerifyTokenCreated()
    });
    return { ...existing, ...updated };
  };
}
