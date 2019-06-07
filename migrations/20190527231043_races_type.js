exports.up = async function(knex) {
  await knex.schema.raw(`
    ALTER TABLE races DROP COLUMN type;
    CREATE TYPE race_type AS ENUM ('player', 'horse', 'pig', 'elytra');
    ALTER TABLE races ADD COLUMN type race_type;
    UPDATE races SET type = 'player' WHERE type IS NULL;
    ALTER TABLE races ALTER COLUMN type SET NOT NULL;
  `);
};

exports.down = function() {};
