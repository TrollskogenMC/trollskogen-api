require("dotenv").config();
const DiscordBot = require("./src/DiscordBot");
const knex = require("./src/knex");
const createVerifyToken = require("./src/createVerifyToken");
const server = require("./src/server");
const createIOClient = require("./src/createIOClient");
const wrapHandler = require("./src/wrapHandler");

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

const racesEndpoint = require("./src/routeHandlers/races/race");

server.post("/races/race", wrapHandler(racesEndpoint.create));
server.post("/races/race/addStart", wrapHandler(racesEndpoint.addStartPoint));
server.del("/races/race/start", wrapHandler(racesEndpoint.deleteStartPoint));
server.del("/races/race", wrapHandler(racesEndpoint.delete));
server.put("/races/race", wrapHandler(racesEndpoint.update));

const createCheckpoint = require("./src/routeHandlers/createCheckpoint/createCheckpoint");
server.post("/race/point", wrapHandler(createCheckpoint));

const deleteCheckpoint = require("./src/routeHandlers/deleteCheckpoint/deleteCheckpoint");
server.del("/race/point", wrapHandler(deleteCheckpoint));

server.get("/races", wrapHandler(require("./src/routeHandlers/getRaces")));

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
