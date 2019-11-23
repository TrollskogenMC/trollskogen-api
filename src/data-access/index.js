import knex from "knex";
import makeServerDb from "./database.js";

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
