import makeOngoingQuest from "../quests/index.js";

export default function makeAddOngoingQuest({ db }) {
  return async function(ongoingQuestInfo) {
    const ongoingquest = makeOngoingQuest(ongoingQuestInfo);

    return db.insertOngoingQuest({
      isActive: ongoingquest.getIsAactive(),
      is_complete: ongoingQuestInfo.getIsComplete(),
      name: ongoingquest.getName(),
      participation: ongoingquest.getParticipation(),
      quest_id: ongoingquest.getQuestId(),
      user_id: ongoingquest.getUserId()
    });
  };
}
