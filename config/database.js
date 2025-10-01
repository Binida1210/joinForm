var mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting to MySQL: " + err);
    return;
  }
  console.log("Connected to MySQL database.");
});

module.exports = connection;
