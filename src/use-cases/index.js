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
import makeUserSession from "./addUserSession.js";
import makeListOngoingQuests from "./listOngoingQuests.js";
import makeRetrieveOngoingQuest from "./retrieveOngoingquest.js";
import makeAddOngoingQuest from "./addOngoingquest.js";
import makeRemoveOngoingQuest from "./removeOngoinquest.js";
import makeEditOngoingQuest from "./editOngoingquest.js";
import makeListActiveOngoingQuests from "./listActiveOngoingquests.js";
import makeListCompleteOngoingQuests from "./listCompleteOngoingquests.js";
import makeListTopleteCompleteOngoingQuests from "./listTopCompletedOngoingQuests.js";

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
const addUserSession = makeUserSession({ db });
const listOngoingQuests = makeListOngoingQuests({ db });
const retrieveOngoingquest = makeRetrieveOngoingQuest({ db });
const addOngoingQuest = makeAddOngoingQuest({ db });
const removeOngoingQuest = makeRemoveOngoingQuest({ db });
const editOngoingQuest = makeEditOngoingQuest({ db });
const listActiveOngoingQuests = makeListActiveOngoingQuests({ db });
const listCompleteOngoingQuests = makeListCompleteOngoingQuests({ db });
const listTopleteCompleteOngoingQuests = makeListTopleteCompleteOngoingQuests({db});
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
  addUserSession,
  listOngoingQuests,
  retrieveOngoingquest,
  addOngoingQuest,
  removeOngoingQuest,
  editOngoingQuest,
  listActiveOngoingQuests,
  listCompleteOngoingQuests,
  listTopleteCompleteOngoingQuests
};
