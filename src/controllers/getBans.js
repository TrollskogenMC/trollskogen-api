/* eslint-disable */
export default function makeGetBans({ listBans }) {
  return async function() {
    try {
      const bans = await listBans();
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: { bans }
      };
    } catch (e) {
      console.log(e);
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
/* eslint-enable */
