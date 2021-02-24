export default function makeGetOngoingQuests({ listOngoingQuests }) {
  return async function() {
    try {
      const ongoingQuests = await listOngoingQuests();
      return {
        body: { ongoingQuests },
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
