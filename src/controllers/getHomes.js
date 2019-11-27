export default function makeGetHomes({ listHomes }) {
  return async function() {
    try {
      const homes = await listHomes();
      return {
        body: { homes },
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
