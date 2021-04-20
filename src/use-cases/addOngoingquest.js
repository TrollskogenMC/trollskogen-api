import makeOngoingQuest from "../quests/index.js";

export default function makeAddOngoingQuest({ db }) {
  return async function(ongoingQuestInfo) {
    const ongoingquest = makeOngoingQuest(ongoingQuestInfo);

    return db.insertOngoingQuest({
      activated_on: ongoingquest.getActivatedOn(),
      expires_on: ongoingquest.getExipiresOn(),
      is_active: ongoingquest.getIsActive(),
      is_complete: ongoingquest.getIsComplete(),
      name: ongoingquest.getName(),
      participation: ongoingquest.getParticipation(),
      quest_id: ongoingquest.getQuestId(),
      user_id: ongoingquest.getUserId()
    });
  };
}
