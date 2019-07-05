const { createServer, plugins } = require("restify");
const corsMiddleware = require('restify-cors-middleware')

const server = createServer({
  name: "myapp",
  version: "1.0.0"
});

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['https://*.netlify.com']
})
 
server.pre(cors.preflight);
server.use(cors.actual);

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

server.use((req, res, next) => {
  console.log(req.url, req.body);
  next();
});

module.exports = server;
