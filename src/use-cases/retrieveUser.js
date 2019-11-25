export default function makeRetrieveUser({ db }) {
  return async function({ id }) {
    if (!id) {
      throw new Error("You must supply a user id.");
    }
    const user = await db.findUserById({ id });
    if (!user) {
      return null;
    }
    const bans = await db.findBansByUserId({ userId: id });
    user.bans = bans;
    return user;
  };
}
