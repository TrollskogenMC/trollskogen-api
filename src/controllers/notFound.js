export default function makeGetUsers() {
  return async function(httpRequest) {
    return {
      body: {
        error: httpRequest.error.message
      },
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 404
    };
  };
}
