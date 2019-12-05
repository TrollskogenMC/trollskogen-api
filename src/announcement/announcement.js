export default function buildMakeAnnouncement() {
  return function({ id, name, text }) {
    if (!name) {
      throw new Error("Announcement must have a name.");
    }

    if (!text) {
      throw new Error("Announcement must have a text");
    }

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getText: () => text
    });
  };
}
