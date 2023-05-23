const express = require('express');
const { createPool } = require('mysql2/promise');
require('dotenv').config();
const fileUpload = require('express-fileupload');

const app = express();
const cors = require('cors');
app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
  }),
);

// Parse les Url
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT;

// Import endpoints
const userEndpoints = require('./endpoints/user/userEndpoints');

(async () => {
  try {
    let constantRes;
    const db = await createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
    setInterval(async () => {
      await db.query('SELECT 1');
    }, 100000);

    userEndpoints(app, db);

    app.listen(PORT, () => {
      console.log(`Listening on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error('Error creating database pool:', error);
  }
})();
