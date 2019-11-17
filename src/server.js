const { createServer, plugins } = require("restify");
const corsMiddleware = require("restify-cors-middleware");

const server = createServer({
  name: "myapp",
  version: "1.0.0"
});

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ["https://*.netlify.com", "https://trollskogen.nu"]
});

server.pre(cors.preflight);
server.use(cors.actual);

server.pre((req, res, next) => {
  if (req.headers["x-forwarded-proto"] != "https") {
    res.redirect(
      302,
      "https://" + req.headers["x-forwarded-host"] + req.url,
      next
    );
  } else {
    next();
  }
  return next();
});

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

module.exports = server;
