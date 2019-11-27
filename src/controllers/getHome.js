export default function makeGetHome({ retrieveHome }) {
  return async function(httpRequest) {
    try {
      const home = await retrieveHome({ id: httpRequest.params.id });
      if (!home) {
        return { statusCode: 404 };
      }
      return {
        body: { home },
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
