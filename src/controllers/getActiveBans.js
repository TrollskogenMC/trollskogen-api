export default function makeGetActiveBans({ listBans }) {
  return async function() {
    try {
      const bans = await listBans({ active: true });
      return {
        body: { bans },
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
