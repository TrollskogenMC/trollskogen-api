import pg from "pg";
import knex from "knex";
import makeServerDb from "./database.js";

// https://github.com/knex/knex/issues/927#issuecomment-130485134
pg.types.setTypeParser(1700, Number);

const SSL_SUFFIX = "?ssl=true";

let connectionString = process.env.DATABASE_URL;
if (!connectionString.endsWith(SSL_SUFFIX)) {
  connectionString += SSL_SUFFIX;
}

const instance = knex({
  client: "postgresql",
  connection: connectionString,
  migrations: {
    tableName: "knex_migrations"
  }
});

const db = makeServerDb({ makeDb });

export function makeDb() {
  return instance;
}
export default db;
