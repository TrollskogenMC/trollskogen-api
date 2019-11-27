import makeHome from "../home/index.js";

export default function makeAddHome({ db }) {
  return async function(homeInfo) {
    const home = makeHome(homeInfo);

    return db.insertHome({
      allow_commands: home.getAllowCommands(),
      is_open: home.isOpen(),
      name: home.getName(),
      pitch: home.getPitch(),
      user_id: home.getUserId(),
      world: home.getWorld(),
      x: home.getX(),
      y: home.getY(),
      yaw: home.getYaw(),
      z: home.getZ()
    });
  };
}
