import makeUserSession from "../user-session/index.js";

export default function makeAddUserSession({ db }) {
  return async function(userSessionInfo) {
    const userSession = makeUserSession(userSessionInfo);

    return db.insertUserSession({
      end: userSession.getEnd(),
      ip: userSession.getIp(),
      start: userSession.getStart(),
      user_id: userSession.getUserId()
    });
  };
}
