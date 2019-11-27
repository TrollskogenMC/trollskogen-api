export default function buildMakeHome({ getBoolean }) {
  return function({
    allowCommands,
    isOpen,
    name,
    userId,
    pitch,
    world,
    x,
    y,
    yaw,
    z
  }) {
    const boolAllowCommands = getBoolean(allowCommands);
    if (boolAllowCommands === null) {
      throw new Error("Home must have an allowCommands flag");
    }

    const boolIsOpen = getBoolean(isOpen);
    if (typeof boolIsOpen !== "boolean") {
      throw new Error("Home must have an isOpen flag");
    }

    if (!name) {
      throw new Error("Home must have a name.");
    }

    if (!userId) {
      throw new Error("Home must have a user id.");
    }

    if (!world) {
      throw new Error("Home must have a world");
    }

    return Object.freeze({
      getAllowCommands: () => boolAllowCommands,
      getName: () => name,
      getPitch: () => pitch,
      getUserId: () => userId,
      getWorld: () => world,
      getX: () => x,
      getY: () => y,
      getYaw: () => yaw,
      getZ: () => z,
      isOpen: () => boolIsOpen
    });
  };
}
