export default function makeGetBan({ retrieveBan }) {
  return async function(httpRequest) {
    try {
      const ban = await retrieveBan({ id: httpRequest.params.id });
      if (!ban) {
        return { statusCode: 404 };
      }
      return {
        body: { ban },
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
