const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
});

db.query(`SELECT * FROM api_db_track.users;`, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(res);
});
