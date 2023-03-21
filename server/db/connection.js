const mysql = require("mysql2/promise");

const db = mysql.createPool(
  process.env.NODE_ENV === "DEVELOPMENT"
    ? {
        host: process.env.DEVELOPMENT_DB_HOST,
        user: process.env.DEVELOPMENT_DB_USER,
        password: process.env.DEVELOPMENT_DB_PASSWORD,
        database: process.env.DEVELOPMENT_DB_DATABASE,
      }
    : {
        host: process.env.PRODUCTION_DB_HOST,
        user: process.env.PRODUCTION_DB_USER,
        password: process.env.PRODUCTION_DB_PASSWORD,
        database: process.env.PRODUCTION_DB_DATABASE,
      }
);

module.exports = db;
