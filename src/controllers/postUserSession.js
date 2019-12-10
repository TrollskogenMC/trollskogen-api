export default function makePostUser({ addUserSession }) {
  return async function(httpRequest) {
    if (httpRequest.headers["API-key"] !== process.env.API_KEY) {
      return { statusCode: 401 };
    }
    try {
      const posted = await addUserSession({
        ip: httpRequest.body.ip,
        start: httpRequest.body.start,
        user_id: httpRequest.body.user_id
      });
      return {
        body: { posted },
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
