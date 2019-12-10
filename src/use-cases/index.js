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
import makeRemoveHome from "./removeHome.js";
import makeEditBan from "./editBan.js";
import makeAddAnnouncement from "./addAnnouncement.js";
import makeRemoveAnnouncement from "./removeAnnouncement.js";
import makeListAnnouncements from "./listAnnouncements.js";
import makeEditAnnouncement from "./editAnnouncement.js";
import makeListChat from "./listChat.js";
import makeAddChat from "./addChat.js";
import makeMigrate from "./migrate.js";
import makeUserSession from "./addUserSession.js";

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
const removeHome = makeRemoveHome({ db });
const editBan = makeEditBan({ db });
const addAnnouncement = makeAddAnnouncement({ db });
const removeAnnouncement = makeRemoveAnnouncement({ db });
const listAnnouncements = makeListAnnouncements({ db });
const editAnnouncement = makeEditAnnouncement({ db });
const listChat = makeListChat({ db });
const addChat = makeAddChat({ db });
const migrate = makeMigrate({ addBan, addHome, addUser, db });
const addUserSession = makeUserSession({ db });

export {
  addAnnouncement,
  addBan,
  editHome,
  listBans,
  listChat,
  listUsers,
  saveToken,
  listHomes,
  retrieveBan,
  retrieveUser,
  retrieveHome,
  addHome,
  addUser,
  editUser,
  removeHome,
  editBan,
  removeAnnouncement,
  editAnnouncement,
  addChat,
  listAnnouncements,
  migrate,
  addUserSession
};
