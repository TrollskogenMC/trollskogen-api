import {
  listBans,
  listUsers,
  saveToken,
  listHomes,
  addBan,
  retrieveBan,
  retrieveUser,
  editHome,
  addHome,
  retrieveHome,
  addUser,
  editUser,
  removeHome,
  editBan,
  listAnnouncements,
  addAnnouncement,
  removeAnnouncement,
  editAnnouncement,
  listChat,
  addChat,
  migrate,
  addUserSession
} from "../use-cases/index.js";
import makeGetBans from "./getBans.js";
import makeGetActiveBans from "./getActiveBans.js";
import makeGetUsers from "./getUsers.js";
import makePutToken from "./putToken.js";
import makeGetHomes from "./getHomes.js";
import makePostBan from "./postBan.js";
import makeGetBan from "./getBan.js";
import makeGetUser from "./getUser.js";
import makePostHome from "./postHome.js";
import makeGetHome from "./getHome.js";
import makePatchHome from "./patchHome.js";
import makePostUser from "./postUser.js";
import makePatchUser from "./patchUser.js";
import makeDeleteHome from "./deleteHome.js";
import makePatchBan from "./patchBan.js";
import makeGetAnnouncements from "./getAnnouncements.js";
import makePostAnnouncement from "./postAnnouncement.js";
import makeDeleteAnnouncement from "./deleteAnnouncement.js";
import makePatchAnnouncement from "./patchAnnouncement.js";
import makeNotFound from "./notFound.js";
import makeGetChat from "./getChat.js";
import makePostChat from "./postChat.js";
import makeMigrate from "./postMigrate.js";
import makePostUserSession from "./postUserSession.js";

const getBans = makeGetBans({ listBans });
const getUsers = makeGetUsers({ listUsers });
const putToken = makePutToken({ saveToken });
const getActiveBans = makeGetActiveBans({ listBans });
const getHomes = makeGetHomes({ listHomes });
const postBan = makePostBan({ addBan });
const getBan = makeGetBan({ retrieveBan });
const getUser = makeGetUser({ retrieveUser });
const postHome = makePostHome({ addHome });
const getHome = makeGetHome({ retrieveHome });
const patchHome = makePatchHome({ editHome });
const postUser = makePostUser({ addUser });
const patchUser = makePatchUser({ editUser });
const deleteHome = makeDeleteHome({ removeHome });
const patchBan = makePatchBan({ editBan });
const getAnnouncements = makeGetAnnouncements({ listAnnouncements });
const postAnnouncement = makePostAnnouncement({ addAnnouncement });
const deleteAnnouncement = makeDeleteAnnouncement({ removeAnnouncement });
const patchAnnouncement = makePatchAnnouncement({ editAnnouncement });
const notFound = makeNotFound({});
const getChat = makeGetChat({ listChat });
const postChat = makePostChat({ addChat });
const postMigrate = makeMigrate({ migrate });
const postUserSession = makePostUserSession({ addUserSession });

export {
  deleteAnnouncement,
  deleteHome,
  getActiveBans,
  getBan,
  getBans,
  getUsers,
  putToken,
  getHomes,
  getUser,
  getHome,
  postBan,
  postHome,
  patchHome,
  postUser,
  patchUser,
  getChat,
  getAnnouncements,
  postAnnouncement,
  patchAnnouncement,
  patchBan,
  postChat,
  postMigrate,
  postUserSession,
  notFound
};
