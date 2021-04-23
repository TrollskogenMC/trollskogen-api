export default function makeRetrieveOngoingQuest({ db }) {
  return async function({ id }) {
    if (!id) {
      throw new Error("You must supply a home id.");
    }

    const ongoingQuest = await db.findOngoingQuestById({ id });

    if (!ongoingQuest) {
      return null;
    }

    return ongoingQuest;
  };
}
