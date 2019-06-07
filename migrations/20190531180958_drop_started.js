exports.up = async function(knex) {
  await knex.raw("ALTER TABLE races DROP COLUMN is_started;");
};

exports.down = function() {};
