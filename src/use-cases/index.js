import db from "../data-access/index.js";
import makeListBans from "./listBans.js";
import makeListUsers from "./listUsers.js";
import makeSaveToken from "./saveToken.js";
import makeListHomes from "./listHomes.js";
import makeAddBan from "./addBan.js";
import makeRetrieveBan from "./retrieveBan.js";
import makeRetrieveUser from "./retrieveUser.js";
import makeRetrieveHome from "./retrieveHome.js";
import makeAddHome from "./addHome.js";

const listBans = makeListBans({ db });
const listUsers = makeListUsers({ db });
const saveToken = makeSaveToken({ db });
const listHomes = makeListHomes({ db });
const addBan = makeAddBan({ db });
const retrieveBan = makeRetrieveBan({ db });
const retrieveUser = makeRetrieveUser({ db });
const retrieveHome = makeRetrieveHome({ db });
const addHome = makeAddHome({ db });

export {
  addBan,
  listBans,
  listUsers,
  saveToken,
  listHomes,
  retrieveBan,
  retrieveUser,
  retrieveHome,
  addHome
};
