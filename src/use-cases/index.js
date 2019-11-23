import db from "../data-access/index.js";
import makeListBans from "./listBans.js";
import makeListUsers from "./listUsers.js";
import makeSaveToken from "./saveToken.js";

const listBans = makeListBans({ db });
const listUsers = makeListUsers({ db });
const saveToken = makeSaveToken({ db });

export { listBans, listUsers, saveToken };
