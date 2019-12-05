export default function makeRemoveHome({ db }) {
  return async function({ id } = {}) {
    if (!id) {
      throw new Error("You must supply a home id.");
    }

    const homeToDelete = await db.findHomeById({ id });

    if (!homeToDelete) {
      return deleteNothing();
    }

    return hardDelete(homeToDelete);
  };

  function deleteNothing() {
    return {
      deletedCount: 0,
      message: "Home not found, nothing to delete."
    };
  }

  async function hardDelete(comment) {
    await db.removeHome(comment);
    return {
      deletedCount: 1,
      message: "Home deleted."
    };
  }
}
