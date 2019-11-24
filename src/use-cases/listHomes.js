export default function makeListHomes({ db }) {
  return async function() {
    return db.findAllHomes();
  };
}
