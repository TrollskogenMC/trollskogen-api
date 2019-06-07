exports.up = async function(knex) {
  await knex.schema.raw(`
    ALTER TABLE races ADD COLUMN is_started BOOLEAN;
    UPDATE races SET is_started = FALSE WHERE is_started IS NULL;
    ALTER TABLE races ALTER COLUMN is_started SET NOT NULL;
    ALTER TABLE races ADD CONSTRAINT races_is_editing_is_enabled_check CHECK (
      NOT (is_editing IS TRUE AND is_enabled IS TRUE)
    );
    ALTER TABLE races ADD CONSTRAINT races_is_enabled_is_started_check CHECK (
      NOT (is_enabled IS FALSE AND is_started IS TRUE)
    );
  `);
};

exports.down = function() {};
