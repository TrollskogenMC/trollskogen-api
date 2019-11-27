import corsMiddleware from "restify-cors-middleware";
import restify from "restify";
import {
  getBans,
  getUsers,
  getToken,
  getActiveBans,
  getHomes,
  postBan,
  getBan,
  getUser,
  postHome,
  getHome
} from "./controllers/index.js";
import DiscordBot from "./discordBot.js";
import createIOClient from "./createIoClient.js";
import forceSSL from "./forceSsl.js";
import makeCallback from "./expressCallback.js";

if (!process.env.API_KEY) {
  throw new Error("Application requires API_KEY to be set.");
}

const cors = corsMiddleware({
  origins: ["https://*.netlify.com", "https://trollskogen.nu"],
  preflightMaxAge: 5
});

const app = restify.createServer();
app.pre(forceSSL);
app.pre(cors.preflight);
app.use(cors.actual);
app.use(restify.plugins.acceptParser(app.acceptable));
app.use(restify.plugins.queryParser());
app.use(restify.plugins.bodyParser());
app.get("/bans", makeCallback(getBans));
app.get("/bans/active", makeCallback(getActiveBans));
app.get("/users", makeCallback(getUsers));
app.get("/create-token", makeCallback(getToken));
app.get("/homes", makeCallback(getHomes));
app.post("/ban", makeCallback(postBan));
app.get("/ban/:id(^[0-9]+$)", makeCallback(getBan));
app.get("/user/:id(^[0-9]+$)", makeCallback(getUser));
app.post("/home", makeCallback(postHome));
app.get("/home/:id(^[0-9]+$)", makeCallback(getHome));

// const racesEndpoint = require("./routeHandlers/races/race");

// app.post("/races/race", wrapHandler(racesEndpoint.create));
// app.post("/races/race/addStart", wrapHandler(racesEndpoint.addStartPoint));
// app.del("/races/race/start", wrapHandler(racesEndpoint.deleteStartPoint));
// app.del("/races/race", wrapHandler(racesEndpoint.delete));
// app.put("/races/race", wrapHandler(racesEndpoint.update));

// const createCheckpoint = require("./routeHandlers/createCheckpoint/createCheckpoint");
// app.post("/race/point", wrapHandler(createCheckpoint));

// const deleteCheckpoint = require("./routeHandlers/deleteCheckpoint/deleteCheckpoint");
// app.del("/race/point", wrapHandler(deleteCheckpoint));

// app.get("/races", wrapHandler(require("./routeHandlers/getRaces")));

app.listen(process.env.PORT, () => {
  console.log("Server is listening at port %s", process.env.PORT);
});

const io = createIOClient(process.env.WEBSOCKET_URL);
const bot = new DiscordBot();
bot.start(io);

function shutItDown() {
  app.close(() => {
    bot.destroy();
  });
}

process.on("SIGTERM", shutItDown);
process.on("SIGTERM", shutItDown);
