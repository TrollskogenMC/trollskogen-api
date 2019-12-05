import makeAnnouncement from "../announcement/index.js";

export default function({ db }) {
  return async function({ id, ...changes }) {
    if (!id) {
      throw new Error("You must supply an id.");
    }

    const existing = await db.findAnnouncementById({
      id
    });

    if (!existing) {
      throw new RangeError("Announcement not found.");
    }

    const announcement = makeAnnouncement({
      ...existing,
      ...changes
    });
    const updated = await db.updateAnnouncement({
      id: announcement.getId(),
      name: announcement.getName(),
      text: announcement.getText()
    });
    return { ...existing, ...updated };
  };
}
