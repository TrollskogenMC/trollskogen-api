export default function makeListBans({ db }) {
  return async function listBans({ active } = {}) {
    if (active) {
      return db.findActiveBans();
    } else {
      return db.findAllBans();
    }
  };
}
