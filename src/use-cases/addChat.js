import makeChat from "../chat/index.js";

export default function makeAddChat({ db }) {
  return async function(chatInfo) {
    const chat = makeChat(chatInfo);

    return db.insertChat({
      message: chat.getMessage(),
      posted: chat.getPosted(),
      user_id: chat.getUserId()
    });
  };
}
