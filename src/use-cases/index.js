import db from "../data-access/index.js";
import makeListBans from "./listBans.js";
import makeListUsers from "./listUsers.js";
import makeSaveToken from "./saveToken.js";
import makeListHomes from "./listHomes.js";
import makeAddBan from "./addBan.js";
import makeRetrieveBan from "./retrieveBan.js";
import makeRetrieveUser from "./retrieveUser.js";

const listBans = makeListBans({ db });
const listUsers = makeListUsers({ db });
const saveToken = makeSaveToken({ db });
const listHomes = makeListHomes({ db });
const addBan = makeAddBan({ db });
const retrieveBan = makeRetrieveBan({ db });
const retrieveUser = makeRetrieveUser({ db });

export {
  listBans,
  listUsers,
  saveToken,
  listHomes,
  addBan,
  retrieveBan,
  retrieveUser
};
