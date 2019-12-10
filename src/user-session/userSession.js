export default function buildMakeUserSession() {
  return function({ id, user_id, start, ip, end = null }) {
    if (!user_id) {
      throw new Error("User session must have a user id.");
    }

    if (!start) {
      throw new Error("User session must have a start date.");
    }

    if (!ip) {
      throw new Error("User session must have a an ip address.");
    }

    return Object.freeze({
      getEnd: () => end,
      getId: () => id,
      getIp: () => ip,
      getStart: () => start,
      getUserID: () => user_id
    });
  };
}
