export default function makePostBan({ addBan }) {
  return async function(httpRequest) {
    if (httpRequest.headers["API-key"] !== process.env.API_KEY) {
      return { statusCode: 401 };
    }
    try {
      const { userId, expiryDate, issuerId, reason } = httpRequest.body;
      const banId = await addBan({
        expiryDate,
        issuerId,
        reason,
        userId
      });
      return {
        body: { pathToBan: `/ban/${banId}` },
        statusCode: 201
      };
    } catch (e) {
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
