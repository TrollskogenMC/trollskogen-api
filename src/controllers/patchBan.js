export default function makePatchBan({ editBan }) {
  return async function(httpRequest) {
    if (httpRequest.headers["API-key"] !== process.env.API_KEY) {
      return { statusCode: 401 };
    }
    try {
      const toEdit = {
        ...httpRequest.body,
        id: httpRequest.params.id
      };

      const patched = await editBan(toEdit);
      return {
        body: { patched },
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 200
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
