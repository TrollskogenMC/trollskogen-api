export default function makeListTopleteCompleteOngoingQuests({ db }) {
  return async function() {
    return db.findAllTopCompleteOngoingQuests();
  };
}
