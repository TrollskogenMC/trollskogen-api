export default function buildMakeChat() {
  return function({ user_id, message, posted }) {
    if (!user_id) {
      throw new Error("Chat must have a a user id.");
    }

    if (!message) {
      throw new Error("Chat must have a message.");
    }

    if (!posted) {
      throw new Error("Chat must have a posted date.");
    }

    return Object.freeze({
      getMessage: () => message,
      getPosted: () => posted,
      getUserId: () => user_id
    });
  };
}
