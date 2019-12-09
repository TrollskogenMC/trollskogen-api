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
      console.log(
        `${new Date()} Connection from origin ${request.origin} rejected.`
      );
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

    console.log(`${new Date()} Connection accepted.`);
    connection.on("message", (message) => {
      if (message.type === "utf8") {
        console.log(`Received Message: ${message.utf8Data}`);
        connection.sendUTF(message.utf8Data);
      } else if (message.type === "binary") {
        console.log(
          `Received Binary Message of ${message.binaryData.length} bytes`
        );
        connection.sendBytes(message.binaryData);
      }
    });
    connection.on("close", (reason, description) => {
      console.log(
        `${new Date()} Peer ${connection.remoteAddress} disconnected.`,
        reason,
        description
      );
    });
  });
  return wsServer;
};
