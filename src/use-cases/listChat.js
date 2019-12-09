export default function makeListChat({ db }) {
  return async function() {
    return db.findAllChat();
  };
}
