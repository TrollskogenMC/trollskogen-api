const knex = require("../knex");
module.exports = async () => {
  let races;
  await knex.transaction(async (tsx) => {
    races = await knex
      .transacting(tsx)
      .select()
      .table("races");
    races = races.reduce((acc, race) => {
      acc[race.id] = { ...race, points: [], startPoints: [] };
      return acc;
    }, {});

    const racePoints = await knex
      .transacting(tsx)
      .select()
      .table("race_points");
    racePoints.forEach((racePoint) => {
      races[racePoint.race_id].points.push(racePoint);
    });

    const raceStartPoints = await knex
      .transacting(tsx)
      .select()
      .table("race_start_points");
    raceStartPoints.forEach((raceStartPoint) => {
      races[raceStartPoint.race_id].startPoints.push(raceStartPoint);
    });

    await tsx.commit();
  });
  return {
    races: Object.values(races).map((race) => {
      return { ...race };
    })
  };
};
