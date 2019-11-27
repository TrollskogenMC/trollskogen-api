export default function makeRetrieveHome({ db }) {
  return async function({ id }) {
    if (!id) {
      throw new Error("You must supply a home id.");
    }
    const home = await db.findHomeById({ id });
    if (!home) {
      return null;
    }
    return home;
  };
}
