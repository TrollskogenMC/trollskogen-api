export default function makeGetAnnouncements({ listAnnouncements }) {
  return async function() {
    try {
      const announcements = await listAnnouncements();
      return {
        body: { announcements },
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
