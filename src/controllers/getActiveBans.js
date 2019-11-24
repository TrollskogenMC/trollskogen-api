export default function makeGetActiveBans({ listBans }) {
  return async function() {
    try {
      const bans = await listBans({ active: true });
      return {
        statusCode: 200,
        body: bans
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 400,
        body: {
          error: e.message
        }
      };
    }
  };
}
