export default function makeRetrieveBan({ db }) {
  return async function({ id }) {
    if (!id) {
      throw new Error("You must supply a ban id.");
    }
    const ban = await db.findBanById({ id });
    if (!ban) {
      return null;
    }
    return ban;
  };
}
