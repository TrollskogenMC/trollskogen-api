import knex from "knex";
import makeServerDb from "./database.js";

const instance = knex({
  client: "postgresql",
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: "knex_migrations"
  }
});

const db = makeServerDb({ makeDb });

export function makeDb() {
  return instance;
}
export default db;
