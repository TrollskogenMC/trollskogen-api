export default function makeGetUser({ retrieveUser }) {
  return async function(httpRequest) {
    try {
      const user = await retrieveUser({ id: httpRequest.params.id });
      if (!user) {
        return { statusCode: 404 };
      }
      return {
        statusCode: 200,
        body: { user }
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      };
    }
  };
}
