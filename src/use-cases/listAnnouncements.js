export default function makeListAnnouncements({ db }) {
  return async function() {
    return db.findAllAnnouncements();
  };
}
