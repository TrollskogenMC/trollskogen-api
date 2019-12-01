export default function makePutToken({ saveToken }) {
  return async function(httpRequest) {
    try {
      const token = await saveToken({
        id: httpRequest.body.id
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
