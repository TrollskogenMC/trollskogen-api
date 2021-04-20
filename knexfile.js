require("dotenv").config();
module.exports = {
  client: "pg",
  connection: {
    port: "5432",
    ssl: false,
    database: "trollskogen",
    user: "postgres",
    password: "minekwaft"
  }
};
