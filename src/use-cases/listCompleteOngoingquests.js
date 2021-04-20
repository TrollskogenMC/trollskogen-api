export default function makeListCompleteOngoingQuests({ db }) {
  return async function() {
    return db.findAllCompleteOngoingQuests();
  };
}
