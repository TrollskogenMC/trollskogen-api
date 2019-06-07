const knex = require("../../knex");
const ajv = require("../../ajv");
const validator = ajv.compile(require("./deleteCheckpointSchema"));
const isSequential = require("../isSequential");

const deleteCheckpoint = async (req, res) => {
  if (!validator(req.body)) {
    res.send(400, validator.errors);
    return;
  }

  const { race_id, race_point } = req.body;

  let affectedRows;

  await knex.transaction(async (tsx) => {
    const points = await knex("race_points")
      .transacting(tsx)
      .where({ race_id })
      .orderBy("position", "asc")
      .pluck("position");

    if (points.length === 0) {
      throw new Error(`No checkpoints to delete for race \`${race_id}\``);
    }

    if (points[0] !== 1) {
      throw new Error("First checkpoint doesn't start with 1");
    }

    if (!isSequential(points)) {
      throw new Error(`Checkpoints are not sequential: \`${points}\``);
    }

    affectedRows = await knex("race_points")
      .transacting(tsx)
      .where({ race_id, position: race_point })
      .delete();
    if (affectedRows === 1) {
      await knex("race_points")
        .transacting(tsx)
        .where("position", ">", race_point)
        .andWhere({ race_id })
        .decrement("position", 1);
    }

    await tsx.commit();
  });
};

module.exports = deleteCheckpoint;
