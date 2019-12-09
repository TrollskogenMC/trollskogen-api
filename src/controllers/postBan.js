export default function makePostBan({ addBan }) {
  return async function(httpRequest) {
    if (httpRequest.headers["API-key"] !== process.env.API_KEY) {
      return { statusCode: 401 };
    }
    try {
      const { user_id, expiry_date, issued_by, reason } = httpRequest.body;
      const ban = await addBan({
        expiry_date,
        issued_by,
        reason,
        user_id
      });
      return {
        body: { posted: ban },
        headers: {
          "Content-Type": "application/json"
        },
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
