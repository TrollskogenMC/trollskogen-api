export default function buildMakeOngoingQuest() {
  return function({
    name,
    id,
    user_id,
    quest_id,
    participation,
    is_active,
    is_complete,
    activated_on,
    expires_on
  }) {
    if (typeof name !== "string") {
      throw new Error("Ongoingquest must have a name");
    }

    if (!user_id) {
      throw new Error("Ongoingquest must have a user_id");
    }

    if (!quest_id) {
      throw new Error("Ongoingquest must have a quest_id");
    }

    if (!Number.isInteger(participation)) {
      throw new Error("Ongoingquest must have a participation");
    }

    if (typeof is_active !== "boolean") {
      throw new Error("Ongoingquest must have an isActive");
    }

    if (typeof is_complete !== "boolean") {
      throw new Error("Ongoingquest must have an isComplete");
    }

    return Object.freeze({
      getActivatedOn: () =>
        activated_on
          ? new Date(activated_on).toISOString()
          : new Date().toISOString(),
      getId: () => id,
      getIsActive: () => is_active,
      getIsComplete: () => is_complete,
      getName: () => name,
      getParticipation: () => participation,
      getQuestId: () => quest_id,
      getUserId: () => user_id,
      getExipiresOn: () => expires_on
    });
  };
}
