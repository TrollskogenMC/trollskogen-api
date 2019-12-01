export default function makeGetToken({ saveToken }) {
  return async function(httpRequest) {
    try {
      const token = await saveToken({
        lastSeenAs: httpRequest.query.lastSeenAs,
        minecraftUserId: httpRequest.query.userId
      });
      return {
        body: { token },
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
