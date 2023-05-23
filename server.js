const express = require('express');
const app = express();

const { createPool } = require('mysql2/promise');
require('dotenv').config();
const cors = require('cors');
app.use(cors());

const fileUpload = require('express-fileupload');

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
      constantRes = await db.query('SELECT 1');
      console.log(constantRes[0]);
    }, 100000);

    //* Simple test endpoint
    // app.get('/test', async (req, res, next) => {
    //   try {
    //     res.json({
    //       status: 200,
    //       msg: 'Welcome to your API BEER FOR YOU my friend!',
    //     });
    //     console.log('hola terminal');
    //   } catch (error) {
    //     console.error(error);
    //   }
    // });

    app.listen(PORT, () => {
      console.log(`Listening on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error('Error creating database pool:', error);
  }
})();
