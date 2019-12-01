import makeUser from "../user/index.js";

export default function makeAddUser({ db }) {
  return async function(userInfo) {
    const user = makeUser(userInfo);

    return db.insertUser({
      discord_user_id: user.getDiscordUserId(),
      is_verified: user.isVerified(),
      minecraft_uuid: user.getMinecraftUUID(),
      name: user.getName(),
      verify_date: user.getVerifyDate(),
      verify_token: user.getVerifyToken(),
      verify_token_created: user.getVerifyTokenCreated()
    });
  };
}
