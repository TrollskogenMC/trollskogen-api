export default function makeGetUsers({ listUsers }) {
  return async function() {
    try {
      const users = await listUsers();
      return {
        statusCode: 200,
        body: users
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 400,
        body: {
          error: e.message
        }
      };
    }
  };
}
