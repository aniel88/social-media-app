const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "social",
});

// connection.connect((resolve, reject) => {
//   console.log(reject);
// });
// connection.query("SELECT * from userss", (error, results, fields) => {
//   if (error) throw error;
//   console.log(results);
// });

module.exports = db;
