require("dotenv").config();
const { createServer, plugins } = require("restify");
const DiscordBot = require("./src/DiscordBot");
const knex = require("./src/knex");
const createVerifyToken = require("./src/createVerifyToken");
const server = require("./src/server");
const errors = require("restify-errors");
const createIOClient = require("./src/createIOClient");

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

server.get("/create-token", async (req, res, next) => {
  if (!req.query.userId) {
    return createErrorMessage(res, next, 400, "Missing query parameter userId");
  }

  if (!req.query.lastSeenAs) {
    return createErrorMessage(
      res,
      next,
      400,
      "Missing query parameter lastSeenAs"
    );
  }

  const token = await createVerifyToken(req.query.userId, req.query.lastSeenAs);
  res.send({ token });
  next();
});

server.get("/users", async (req, res, next) => {
  let users;
  try {
    users = await knex.select().table("users");
  } catch (e) {
    return createErrorMessage(res, next, 500, e);
  }

  res.json(users);

  next();
});

server.listen(process.env.PORT, function() {
  console.log("%s listening at %s", server.name, server.url);
});

function createErrorMessage(res, next, code, message) {
  res.send(code, {
    error: {
      message
    }
  });
  next();
}

const io = createIOClient(process.env.WEBSOCKET_URL);
const bot = new DiscordBot();
bot.start(io);

process.on("SIGTERM", () => {
  server.close(() => {
    bot.destroy();
  });
});

process.on("SIGTERM", () => {
  server.close(() => {
    bot.destroy();
  });
});
