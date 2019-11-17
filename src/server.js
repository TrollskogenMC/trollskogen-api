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

server.use((req, res, next) => {
  if (["production"].indexOf(process.env.NODE_ENV) >= 0) {
    if (req.headers["x-forwarded-proto"] != "https") {
      res.redirect(302, "https://" + req.hostname + req.originalUrl);
    } else {
      next();
    }
  } else {
    next();
  }
});

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

server.use((req, res, next) => {
  console.log(req.url, req.body);
  next();
});

module.exports = server;
