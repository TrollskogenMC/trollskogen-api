import buildMakeHome from "./home.js";

const makeHome = buildMakeHome({ getBoolean });

function getBoolean(value) {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return null;
}

export default makeHome;
