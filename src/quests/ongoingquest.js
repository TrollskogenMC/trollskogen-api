export default function buildMakeonogingQuest() {
  return function({ name, id, user_id, quest_id, participation, isActive }) {
    if (typeof name !== "string") {
      throw new Error("Ongoingquest must have a name");
    }

    if (!id) {
      throw new Error("Ongoingquest must have an id");
    }

    if (!user_id) {
      throw new Error("Ongoingquest must have a user_id");
    }

    if (!quest_id) {
      throw new Error("Ongoingquest must have a quest_id");
    }

    if (participation >= 0) {
      throw new Error("Ongoingquest must have a participation");
    }

    if (typeof isActive === "boolean") {
      throw new Error("Ongoingquest must have an isActive");
    }

    return Object.freeze({
      getId: () => id,
      getIsAcive: () => isActive,
      getName: () => name,
      getParticipation: () => participation,
      getQuestId: () => quest_id,
      getUserId: () => user_id
    });
  };
}
