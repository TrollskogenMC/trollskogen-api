import WebSocket from "websocket";

function originIsAllowed(origin) {
  console.log(origin);
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

export default (httpServer, bot) => {
  const wsServer = new WebSocket.server({
    autoAcceptConnections: false,
    httpServer
  });
  wsServer.on("request", (request) => {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log(`Connection from origin ${request.origin} rejected.`);
      return;
    }

    if (request.httpRequest.headers["api-key"] !== process.env.API_KEY) {
      request.reject();
      console.log(`Connection from origin ${request.origin} rejected.`);
      return;
    }

    const connection = request.accept("", request.origin);

    bot.on("verified", (info) => {
      connection.sendUTF(
        JSON.stringify({
          type: "verified",
          ...info
        })
      );
    });

    console.log(`Connection accepted from ${connection.remoteAddress}.`);
    connection.on("message", (message) => {
      if (message.type === "utf8") {
        connection.sendUTF(message.utf8Data);
      }
    });
    connection.on("close", (reason, description) => {
      console.log(
        `Peer ${connection.remoteAddress} disconnected.`,
        reason,
        description
      );
    });
  });
  return wsServer;
};
