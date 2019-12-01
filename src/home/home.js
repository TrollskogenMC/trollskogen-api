export default function buildMakeHome() {
  return function({
    allow_commands,
    is_open,
    name,
    user_id,
    pitch,
    world,
    x,
    y,
    yaw,
    z,
    id
  }) {
    if (typeof allow_commands !== "boolean") {
      throw new Error("Home must have an allowCommands flag");
    }

    if (typeof is_open !== "boolean") {
      throw new Error("Home must have an isOpen flag");
    }

    if (!name) {
      throw new Error("Home must have a name.");
    }

    if (!user_id) {
      throw new Error("Home must have a user id.");
    }

    if (!world) {
      throw new Error("Home must have a world");
    }

    return Object.freeze({
      getAllowCommands: () => allow_commands,
      getId: () => id,
      getName: () => name,
      getPitch: () => pitch,
      getUserId: () => user_id,
      getWorld: () => world,
      getX: () => x,
      getY: () => y,
      getYaw: () => yaw,
      getZ: () => z,
      isOpen: () => is_open
    });
  };
}
