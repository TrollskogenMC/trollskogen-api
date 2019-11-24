import { listBans, listUsers, saveToken } from "../use-cases/index.js";
import makeGetBans from "./getBans.js";
import makeGetActiveBans from "./getActiveBans.js";
import makeGetUsers from "./getUsers.js";
import makeGetToken from "./getToken.js";

const getBans = makeGetBans({ listBans });
const getUsers = makeGetUsers({ listUsers });
const getToken = makeGetToken({ saveToken });
const getActiveBans = makeGetActiveBans({ listBans });

export { getBans, getUsers, getToken, getActiveBans };
