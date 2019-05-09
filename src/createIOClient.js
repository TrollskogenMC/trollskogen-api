module.exports = (url) => {
  const io = require("socket.io-client")(url, {
    forceNew: true
  });
  io.on("connect_error", (error, b, c) => {
    console.log("Connect error " + error, b, c);
  });
  io.on("connect_timeout", (timeout) => {
    console.log("Connect timeout");
  });
  io.on("connection", (socket) => {
    console.log("Connected to" + socket);
  });
  io.on("error", (error) => {
    console.log("Error " + error);
  });
  io.on("disconnect", (reason) => {
    console.log("Disconnected because: " + reason);
    if (reason === "io server disconnect") {
      socket.connect();
    }
  });
  io.on("reconnect", (attemptNumber) => {
    console.log("Reconnected");
  });
  io.on("reconnect_attempt", () => {
    console.log("Reconnection attempt");
  });
  io.on("reconnect_error", (error) => {
    console.log("Reconnecting error");
  });
  io.on("reconnect_failed", () => {
    console.log("Reconnection failed");
  });

  return io;
};
