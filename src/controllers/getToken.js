export default function makeGetToken({ saveToken }) {
  return async function(httpRequest) {
    try {
      const token = await saveToken({
        minecraftUserId: httpRequest.query.userId,
        lastSeenAs: httpRequest.query.lastSeenAs
      });
      return {
        statusCode: 200,
        body: { token }
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
