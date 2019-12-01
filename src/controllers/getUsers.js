export default function makeGetUsers({ listUsers }) {
  return async function() {
    try {
      const users = await listUsers();
      return {
        body: { users },
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 200
      };
    } catch (e) {
      console.log(e);
      return {
        body: {
          error: e.message
        },
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 400
      };
    }
  };
}
