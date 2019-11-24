export default function makeGetHomes({ listHomes }) {
  return async function() {
    try {
      const homes = await listHomes();
      return {
        statusCode: 200,
        body: { homes }
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
