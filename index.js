require("dotenv").config();
const { createServer, plugins } = require("restify");
const DiscordBot = require("./src/DiscordBot");

const server = createServer({
  name: "myapp",
  version: "1.0.0"
});

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

server.get("/ping", (req, res, next) => {
  res.send("pong");
  return next();
});

server.listen(process.env.API_PORT, function() {
  console.log("%s listening at %s", server.name, server.url);
});

new DiscordBot().start();
