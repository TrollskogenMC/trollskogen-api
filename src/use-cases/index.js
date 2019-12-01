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
import makeEditHome from "./editHome.js";
import makeAddUser from "./addUser.js";
import makeEditUser from "./editUser.js";

const listBans = makeListBans({ db });
const listUsers = makeListUsers({ db });
const listHomes = makeListHomes({ db });
const addBan = makeAddBan({ db });
const retrieveBan = makeRetrieveBan({ db });
const retrieveUser = makeRetrieveUser({ db });
const retrieveHome = makeRetrieveHome({ db });
const addHome = makeAddHome({ db });
const editHome = makeEditHome({ db });
const addUser = makeAddUser({ db });
const editUser = makeEditUser({ db });
const saveToken = makeSaveToken({ db, editUser });

export {
  addBan,
  editHome,
  listBans,
  listUsers,
  saveToken,
  listHomes,
  retrieveBan,
  retrieveUser,
  retrieveHome,
  addHome,
  addUser,
  editUser
};
