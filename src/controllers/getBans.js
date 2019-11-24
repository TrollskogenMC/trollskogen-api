export default function makeGetBans({ listBans }) {
  return async function() {
    try {
      const bans = await listBans();
      return {
        statusCode: 200,
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
