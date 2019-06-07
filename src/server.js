const { createServer, plugins } = require("restify");

const server = createServer({
  name: "myapp",
  version: "1.0.0"
});

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

server.use((req, res, next) => {
  console.log(req.url, req.body);
  next();
});

module.exports = server;
