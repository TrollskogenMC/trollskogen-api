import makeOngoingQuest from "../quests/index.js";

export default function makeEditOngoingQuest({ db }) {
  return async function({ id, ...changes }) {
    if (!id) {
      throw new Error("You must supply an id.");
    }

    const existing = await db.findOngoingQuestById({
      id
    });

    if (!existing) {
      throw new RangeError("Quest not found.");
    }

    const ongoingquest = makeOngoingQuest({
      ...existing,
      ...changes
    });

    const updated = await db.updateOngoingQuest({
      isActive: ongoingquest.getIsAactive(),
      name: ongoingquest.getName(),
      participation: ongoingquest.getParticipation(),
      quest_id: ongoingquest.getQuestId(),
      user_id: ongoingquest.getUserId()
    });

    return { ...existing, ...updated };
  };
}
