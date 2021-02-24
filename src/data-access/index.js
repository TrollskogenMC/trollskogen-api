import pg from "pg";
import knex from "knex";
import makeServerDb from "./database.js";

// https://github.com/knex/knex/issues/927#issuecomment-130485134
pg.types.setTypeParser(1700, Number);

const SSL_SUFFIX = "?ssl=false";

let connectionString = process.env.DATABASE_URL;
if (!connectionString.endsWith(SSL_SUFFIX)) {
  connectionString += SSL_SUFFIX;
}

console.log(connectionString);

const options = {
  client: "postgresql",
  connection: {
    //connectionString,
    port: "5432",
    ssl: false,
    database: "trollskogen",
    user: "postgres",
    password: "minekwaft"
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
if (process.env.NODE_ENV !== "production") {
  options.pool = { max: 1, min: 0 };
}

const instance = knex(options);

const db = makeServerDb({ makeDb });

export function makeDb() {
  return instance;
}
export default db;
