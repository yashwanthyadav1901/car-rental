const mysql = require("mysql2");
const config = require("./../config/config");

const db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

module.exports = db;
