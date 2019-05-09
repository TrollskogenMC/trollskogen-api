require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: process.env.DATABASE_URL + "?ssl=true",
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL + "?ssl=true",
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
