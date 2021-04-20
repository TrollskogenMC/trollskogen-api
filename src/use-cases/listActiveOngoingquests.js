export default function makeListActivetOngoingQuests({ db }) {
  return async function() {
    return db.findAllActiveOngoingQuests();
  };
}
