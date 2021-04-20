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
      activated_on: ongoingquest.getActivatedOn(),
      expires_on: ongoingquest.getExipiresOn(),
      id: ongoingquest.getId(),
      is_active: ongoingquest.getIsActive(),
      is_complete: ongoingquest.getIsComplete(),
      name: ongoingquest.getName(),
      participation: ongoingquest.getParticipation(),
      quest_id: ongoingquest.getQuestId(),
      user_id: ongoingquest.getUserId()
    });

    return { ...existing, ...updated };
  };
}
