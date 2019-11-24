export default function makeGetBan({ retrieveBan }) {
  return async function(httpRequest) {
    try {
      const ban = await retrieveBan({ id: httpRequest.params.id });
      if (!ban) {
        return { statusCode: 404 };
      }
      return {
        statusCode: 200,
        body: { ban }
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
