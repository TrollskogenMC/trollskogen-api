import makeAnnouncement from "../announcement/index.js";

export default function makeAddAnnouncement({ db }) {
  return async function(announcementInfo) {
    const announcement = makeAnnouncement(announcementInfo);

    return db.insertAnnouncement({
      name: announcement.getName(),
      text: announcement.getText()
    });
  };
}
