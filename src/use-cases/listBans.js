export default function makeListBans({ db }) {
  return async function listBans() {
    return db.findAllBans();
  };
}
