export default function buildMakeUser() {
  return function({
    id,
    minecraft_uuid,
    name,
    is_verified = false,
    discord_user_id = null,
    verify_token = null,
    verify_token_created = null,
    verify_date = null
  }) {
    if (!minecraft_uuid) {
      throw new Error("User must have a minecraft uuid.");
    }

    if (!name) {
      throw new Error("User must have a name.");
    }

    return Object.freeze({
      getDiscordUserId: () => discord_user_id,
      getId: () => id,
      getMinecraftUUID: () => minecraft_uuid,
      getName: () => name,
      getVerifyDate: () => verify_date,
      getVerifyToken: () => verify_token,
      getVerifyTokenCreated: () => verify_token_created,
      isVerified: () => is_verified
    });
  };
}
