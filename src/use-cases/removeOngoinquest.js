export default function makeRemoveOngoingQuest({ db }) {
  return async function({ id } = {}) {
    if (!id) {
      throw new Error("You must supply a ongoingQuestId id.");
    }
    const onGoingQuest = await db.findOngoingQuestById({ id });

    if (!onGoingQuest) {
      return deleteNothing();
    }

    return hardDelete(onGoingQuest);
  };

  function deleteNothing() {
    return {
      deletedCount: 0,
      message: "OngoingQuest not found, nothing to delete."
    };
  }

  async function hardDelete(comment) {
    await db.removeOngoingQuest(comment);
    return {
      deletedCount: 1,
      message: "OngoingQuest deleted."
    };
  }
}
