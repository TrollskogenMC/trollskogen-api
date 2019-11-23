import socketIo from "socket.io-client";

export default function(url) {
  const io = socketIo(url, {
    forceNew: true
  });
  io.on("connect_error", () => {
    // console.log(`Connect error ${error}`, b, c);
  });
  io.on("connect_timeout", () => {
    console.log("Connect timeout");
  });
  io.on("connection", (socket) => {
    console.log(`Connected to${socket}`);
  });
  io.on("error", (error) => {
    console.log(`Error ${error}`);
  });
  io.on("disconnect", (reason) => {
    console.log(`Disconnected because: ${reason}`);
  });
  io.on("reconnect", () => {
    console.log("Reconnected");
  });
  io.on("reconnect_attempt", () => {
    // console.log("Reconnection attempt");
  });
  io.on("reconnect_error", () => {
    // console.log("Reconnecting error");
  });
  io.on("reconnect_failed", () => {
    console.log("Reconnection failed");
  });

  return io;
}
