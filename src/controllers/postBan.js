export default function makePostBan({ addBan }) {
  return async function(httpRequest) {
    try {
      const { userId, expiryDate, issuerId, reason } = httpRequest.body;
      const banId = await addBan({
        userId,
        expiryDate,
        issuerId,
        reason
      });
      return {
        statusCode: 201,
        body: { pathToBan: `/ban/${banId}` }
      };
    } catch (e) {
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
