const knex = require("../../knex");
const ajv = require("../../ajv");
const createRaceValidate = ajv.compile(require("./CreateRaceRequest"));
const deleteValidate = ajv.compile(require("./DeleteRaceRequest"));
const deleteStartPoint = ajv.compile(require("./DeleteRaceStartPointRequest"));
const addPointValidate = ajv.compile(require("./AddStartPointRequest"));
const updateRaceValidate = ajv.compile(require("./UpdateRaceRequest"));
const isSequential = require("../isSequential");

module.exports = {
  deleteStartPoint: async (req, res) => {
    if (!deleteStartPoint(req.body)) {
      res.send(400, deleteStartPoint.errors);
      return;
    }

    const { race_id, start_position } = req.body;

    let affectedRows;

    await knex.transaction(async (tsx) => {
      const points = await knex("race_start_points")
        .transacting(tsx)
        .where({ race_id })
        .orderBy("position", "asc")
        .pluck("position");

      if (points.length === 0) {
        throw new Error(`No start points to delete for race \`${race_id}\``);
      }

      if (points[0] !== 1) {
        throw new Error("First start point doesn't start with 1");
      }

      if (!isSequential(points)) {
        throw new Error(`Start points are not sequential: \`${points}\``);
      }

      affectedRows = await knex("race_start_points")
        .transacting(tsx)
        .where({ race_id, position: start_position })
        .delete();

      if (affectedRows === 1) {
        await knex("race_start_points")
          .transacting(tsx)
          .where("position", ">", start_position)
          .andWhere({ race_id })
          .decrement("position", 1);
      }

      await tsx.commit();
    });
  },
  addStartPoint: async (req, res) => {
    if (!addPointValidate(req.body)) {
      res.send(400, addPointValidate.errors);
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
      location_world
    } = req.body;

    let result;
    await knex.transaction(async (tsx) => {
      const lastPos = await knex("race_start_points")
        .transacting(tsx)
        .select()
        .where({ race_id })
        .orderBy("position", "desc")
        .limit(1);

      if (lastPos.length === 0) {
        if (position !== 1) {
          throw new Error(`Position must be 1 but received \`${position}\``);
        }
      } else if (lastPos[0].position !== position - 1) {
        throw new Error(
          `Position must be \`${lastPos[0].position +
            1}\` but received \`${position}\``
        );
      }

      result = await knex("race_start_points")
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
            location_world
          },
          "id"
        );
      await tsx.commit();
      return result;
    });
    return {
      startPointId: result[0]
    };
  },
  update: async (req, res) => {
    if (!updateRaceValidate(req.body)) {
      res.send(400, updateRaceValidate.errors);
      return;
    }

    const {
      id,
      spawn_x,
      spawn_y,
      spawn_z,
      spawn_pitch,
      spawn_yaw,
      spawn_world,
      name,
      is_editing,
      is_enabled
    } = req.body;

    return knex("races")
      .where({ id })
      .update({
        spawn_x,
        spawn_y,
        spawn_z,
        spawn_pitch,
        spawn_yaw,
        spawn_world,
        name,
        is_enabled,
        is_editing
      });
  },
  create: async (req, res) => {
    if (!createRaceValidate(req.body)) {
      res.send(400, createRaceValidate.errors);
      return;
    }
    const {
      name,
      spawn_x,
      spawn_y,
      spawn_z,
      spawn_pitch,
      spawn_yaw,
      spawn_world,
      is_editing,
      is_enabled,
      type
    } = req.body;

    const [raceId] = await knex("races").insert(
      {
        name,
        spawn_x,
        spawn_y,
        spawn_z,
        spawn_pitch,
        spawn_yaw,
        spawn_world,
        is_editing,
        is_enabled,
        type,
        created_at: new Date()
      },
      "id"
    );

    const [race] = await knex("races")
      .select()
      .where({ id: raceId });

    race.points = [];
    race.startPoints = [];
    return {
      race
    };
  },
  delete: async (req, res) => {
    if (!deleteValidate(req.body)) {
      res.send(400, deleteValidate.errors);
      return;
    }
    const rows = await knex("races")
      .where({ id: req.body })
      .delete();

    if (rows !== 1) {
      throw new Error(`Failed to delete race with id \`${req.body}\`.`);
    }
  }
};
