export default function makeGetBans({ listBans }) {
  return async function() {
    try {
      const bans = await listBans();
      return {
        body: { bans },
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
