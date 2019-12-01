export default function makeGetUser({ retrieveUser }) {
  return async function(httpRequest) {
    try {
      const user = await retrieveUser({ id: httpRequest.params.id });
      if (!user) {
        return { statusCode: 404 };
      }
      return {
        body: { user },
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
