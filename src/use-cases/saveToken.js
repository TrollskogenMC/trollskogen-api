import crypto from "crypto";

export default function makeSaveToken({ db }) {
  return async function({ minecraftUserId, lastSeenAs }) {
    if (!minecraftUserId) {
      throw new Error("You must supply a minecraft user id.");
    }

    if (!lastSeenAs) {
      throw new Error("You must supply last seen as.");
    }

    const token = crypto.randomBytes(3).toString("hex");
    const modifiedRows = await db.createOrUpdateUserWithToken({
      token,
      minecraftUserId,
      lastSeenAs
    });

    console.log(modifiedRows);
    if (modifiedRows === 0) {
      return null;
    }

    return token;
  };
}
