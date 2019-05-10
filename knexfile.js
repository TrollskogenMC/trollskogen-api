require("dotenv").config();

const ssl = process.env.NODE_ENV === "production" ? "?ssl=true" : "";

module.exports = {
  development: {
    client: "postgresql",
    connection: process.env.DATABASE_URL + ssl,
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL + ssl,
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
