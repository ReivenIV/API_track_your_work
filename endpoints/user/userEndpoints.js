require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = parseFloat(process.env.JWT_SALT_ROUNDS);
const secret = process.env.JWT_SECRET;

// --------------------
//     user Endpoints
// --------------------

module.exports = (app, db) => {
  const userModel = require('../../models/user/UserModel')(db);

  //* Simple test endpoint
  app.get('/test', async (req, res, next) => {
    try {
      let testMsg = await userModel.test();
      res.json({
        status: 200,
        msg: ' Testintg userEndpoints!',
        msg2: testMsg,
      });
    } catch (error) {
      console.error(error);
    }
  });

  app.post('/api/v1/user/register', async (req, res, next) => {
    try {
      let checkAllUsers = await userModel.getByEmail(req.body);

      if (checkAllUsers.length > 0) {
        res.json({ status: 400, msg: 'email already stored in DB' });
      }

      await userModel.registerUser(req.body);
      res.json({ msg: 'User aded to database' });
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/v1/user/get_by_username', async (req, res, next) => {
    try {
      let response = await userModel.getByEmailOrUsername(req.body);
      console.log(response);
      res.json({ user: response });
    } catch (error) {
      next(error);
    }
  });

    app.post('/api/v1/user/authenticate', async (req, res, next) => {
      try {
        let response = await userModel.authenticateUser(req.body);
        console.log(response);
        res.json({ token: response });
      } catch (error) {
        next(error);
      }
    });
};
