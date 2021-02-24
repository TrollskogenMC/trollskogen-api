export default function makeListOngoingQuests({ db }) {
  return async function() {
    return db.findAllOngoingQuests();
  };
}
