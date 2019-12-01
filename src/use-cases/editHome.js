import makeHome from "../home/index.js";

export default function makeAddHome({ db }) {
  return async function({ id, ...changes }) {
    if (!id) {
      throw new Error("You must supply an id.");
    }

    const existing = await db.findHomeById({
      id
    });

    if (!existing) {
      throw new RangeError("Home not found.");
    }

    const home = makeHome({
      ...existing,
      ...changes
    });
    const updated = await db.updateHome({
      allow_commands: home.getAllowCommands(),
      id: home.getId(),
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
    return { ...existing, ...updated };
  };
}
