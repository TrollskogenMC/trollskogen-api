import {
  listBans,
  listUsers,
  saveToken,
  listHomes,
  addBan,
  retrieveBan
} from "../use-cases/index.js";
import makeGetBans from "./getBans.js";
import makeGetActiveBans from "./getActiveBans.js";
import makeGetUsers from "./getUsers.js";
import makeGetToken from "./getToken.js";
import makeGetHomes from "./getHomes.js";
import makePostBan from "./postBan.js";
import makeGetBan from "./getBan.js";

const getBans = makeGetBans({ listBans });
const getUsers = makeGetUsers({ listUsers });
const getToken = makeGetToken({ saveToken });
const getActiveBans = makeGetActiveBans({ listBans });
const getHomes = makeGetHomes({ listHomes });
const postBan = makePostBan({ addBan });
const getBan = makeGetBan({ retrieveBan });

export {
  getBans,
  getUsers,
  getToken,
  getActiveBans,
  getHomes,
  postBan,
  getBan
};
