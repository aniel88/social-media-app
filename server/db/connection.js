const mysql = require("mysql2/promise");

const db = mysql.createPool(
  process.env.NODE_ENV === "DEVELOPMENT"
    ? {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DEVELOPMENT_DB_DATABASE,
        port: process.env.DEVELOPMENT_DB_PORT,
      }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.PRODUCTION_DB_DATABASE,
        port: process.env.PRODUCTION_DB_PORT,
      }
);

db.getConnection()
  .then((_resp) => console.log("Server connected to database."))
  .catch((err) => console.log(err));

module.exports = db;
