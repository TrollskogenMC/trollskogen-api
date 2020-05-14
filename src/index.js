import corsMiddleware from "restify-cors-middleware";
import restify from "restify";
import {
  getBans,
  getUsers,
  putToken,
  getActiveBans,
  getHomes,
  postBan,
  getBan,
  getUser,
  postHome,
  getHome,
  patchHome,
  postUser,
  patchUser,
  deleteHome,
  patchBan,
  getAnnouncements,
  postAnnouncement,
  deleteAnnouncement,
  patchAnnouncement,
  notFound,
  postChat,
  getChat,
  postUserSession
} from "./controllers/index.js";
import forceSSL from "./forceSsl.js";
import { makeCallback, makeErrorCallback } from "./expressCallback.js";

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
app.put("/create-token", makeCallback(putToken));
app.get("/bans", makeCallback(getBans));
app.get("/bans/active", makeCallback(getActiveBans));
app.post("/ban", makeCallback(postBan));
app.get("/ban/:id(^[0-9]+$)", makeCallback(getBan));
app.patch("/ban/:id(^[0-9]+$)", makeCallback(patchBan));
app.get("/users", makeCallback(getUsers));
app.get("/user/:id(^[0-9]+$)", makeCallback(getUser));
app.post("/user", makeCallback(postUser));
app.patch("/user/:id(^[0-9]+$)", makeCallback(patchUser));
app.get("/homes", makeCallback(getHomes));
app.get("/home/:id(^[0-9]+$)", makeCallback(getHome));
app.post("/home", makeCallback(postHome));
app.patch("/home/:id(^[0-9]+$)", makeCallback(patchHome));
app.del("/home/:id(^[0-9]+$)", makeCallback(deleteHome));
app.get("/announcements", makeCallback(getAnnouncements));
app.post("/announcement", makeCallback(postAnnouncement));
app.del("/announcement/:id(^[0-9]+$)", makeCallback(deleteAnnouncement));
app.patch("/announcement/:id(^[0-9]+$)", makeCallback(patchAnnouncement));
app.get("/chat", makeCallback(getChat));
app.post("/chat", makeCallback(postChat));
app.post("/user-session", makeCallback(postUserSession));

app.on("NotFound", makeErrorCallback(notFound));

app.listen(process.env.PORT, () => {
  console.log("Server is listening at port %s", process.env.PORT);
});
