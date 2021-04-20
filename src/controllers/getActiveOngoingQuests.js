export default function makeGetActiveOngoingQuests({
  listActiveOngoingQuests
}) {
  return async function() {
    try {
      const ongoingQuests = await listActiveOngoingQuests();
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
