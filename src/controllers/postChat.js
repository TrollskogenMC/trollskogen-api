export default function makePostChat({ addChat }) {
  return async function(httpRequest) {
    if (httpRequest.headers["API-key"] !== process.env.API_KEY) {
      return { statusCode: 401 };
    }
    try {
      const { user_id, message, posted } = httpRequest.body;
      const chat = await addChat({
        message,
        posted,
        user_id
      });
      return {
        body: { posted: chat },
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
