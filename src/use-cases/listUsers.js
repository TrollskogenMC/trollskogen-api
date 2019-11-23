export default function makeListUsers({ db }) {
  return async function listUsers() {
    return db.findAllUsers();
  };
}
