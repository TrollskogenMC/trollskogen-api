const knex = require("../../knex");
const ajv = require("../../ajv");
const validator = ajv.compile(require("./createCheckpointSchema"));

const createCheckpoint = async (req, res) => {
  if (!validator(req.body)) {
    res.send(400, validator.errors);
    return;
  }

  const {
    race_id,
    position,
    location_x,
    location_y,
    location_z,
    location_pitch,
    location_yaw,
    location_world,
    radius
  } = req.body;

  let result;
  await knex.transaction(async (tsx) => {
    const lastPos = await knex("race_points")
      .transacting(tsx)
      .select()
      .where({ race_id })
      .orderBy("position", "desc")
      .limit(1);

    if (lastPos.length === 0) {
      if (position !== 1) {
        throw new Error(`Position must be one but received \`${position}\``);
      }
    } else if (lastPos[0].position !== position - 1) {
      throw new Error(
        `Position must be \`${lastPos[0].position +
          1}\` but received \`${position}\``
      );
    }

    result = await knex("race_points")
      .transacting(tsx)
      .insert(
        {
          race_id,
          position,
          location_x,
          location_y,
          location_z,
          location_pitch,
          location_yaw,
          location_world,
          radius
        },
        "id"
      );
    await tsx.commit();
    return result;
  });
  return {
    racePointId: result[0]
  };
};

module.exports = createCheckpoint;
