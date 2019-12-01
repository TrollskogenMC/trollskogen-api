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
  retrieveHome
} from "../use-cases/index.js";
import makeGetBans from "./getBans.js";
import makeGetActiveBans from "./getActiveBans.js";
import makeGetUsers from "./getUsers.js";
import makeGetToken from "./getToken.js";
import makeGetHomes from "./getHomes.js";
import makePostBan from "./postBan.js";
import makeGetBan from "./getBan.js";
import makeGetUser from "./getUser.js";
import makePostHome from "./postHome.js";
import makeGetHome from "./getHome.js";
import makePatchHome from "./patchHome.js";

const getBans = makeGetBans({ listBans });
const getUsers = makeGetUsers({ listUsers });
const getToken = makeGetToken({ saveToken });
const getActiveBans = makeGetActiveBans({ listBans });
const getHomes = makeGetHomes({ listHomes });
const postBan = makePostBan({ addBan });
const getBan = makeGetBan({ retrieveBan });
const getUser = makeGetUser({ retrieveUser });
const postHome = makePostHome({ addHome });
const getHome = makeGetHome({ retrieveHome });
const patchHome = makePatchHome({ editHome });

export {
  getActiveBans,
  getBan,
  getBans,
  getUsers,
  getToken,
  getHomes,
  getUser,
  getHome,
  postBan,
  postHome,
  patchHome
};
