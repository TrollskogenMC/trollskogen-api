export default function makeDeleteHome({ removeHome }) {
  return async function(httpRequest) {
    if (httpRequest.headers["API-key"] !== process.env.API_KEY) {
      return { statusCode: 401 };
    }
    const headers = {
      "Content-Type": "application/json"
    };
    try {
      const deleted = await removeHome({ id: httpRequest.params.id });
      return {
        body: { deleted },
        headers,
        statusCode: deleted.deletedCount === 0 ? 404 : 200
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
