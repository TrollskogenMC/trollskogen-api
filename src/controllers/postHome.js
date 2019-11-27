export default function makePostHome({ addHome }) {
  return async function(httpRequest) {
    if (httpRequest.headers["API-key"] !== process.env.API_KEY) {
      return { statusCode: 401 };
    }
    console.log(httpRequest);
    try {
      const {
        userId,
        name,
        x,
        y,
        z,
        world,
        pitch,
        yaw,
        isOpen,
        allowCommands
      } = httpRequest.body;
      const homeId = await addHome({
        allowCommands,
        isOpen,
        name,
        pitch,
        userId,
        world,
        x,
        y,
        yaw,
        z
      });
      return {
        body: { pathToHome: `/home/${homeId}` },
        statusCode: 201
      };
    } catch (e) {
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
