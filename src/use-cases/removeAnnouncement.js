export default function makeRemoveAnnouncements({ db }) {
  return async function({ id } = {}) {
    if (!id) {
      throw new Error("You must supply an announcement id.");
    }

    const announcementToDelete = await db.findAnnouncementById({ id });

    if (!announcementToDelete) {
      return deleteNothing();
    }

    return hardDelete(announcementToDelete);
  };

  function deleteNothing() {
    return {
      deletedCount: 0,
      message: "Announcement not found, nothing to delete."
    };
  }

  async function hardDelete(comment) {
    await db.removeAnnouncement(comment);
    return {
      deletedCount: 1,
      message: "Announcement deleted."
    };
  }
}
