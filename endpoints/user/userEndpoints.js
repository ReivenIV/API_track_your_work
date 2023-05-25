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

  app.post('/api/v1/user/register', async (req, res, next) => {
    try {
      let checkAllUsers = await userModel.getByEmailOrUsername(req.body);

      if (checkAllUsers.length > 0) {
        return res.json({ status: 400, msg: 'email already stored in DB' });
      }
      const resgiterResponse = await userModel.registerUser(req.body);
      return res.json({
        user_id: resgiterResponse[0].insertId,
        msg: 'User aded to database',
      });
    } catch (error) {
      next(error);
    }
  });

  //! testing module
  app.post('/api/v1/user/authenticate', async (req, res, next) => {
    try {
      let response = await userModel.authenticateUser(req.body);

      res.json({ token: response });
    } catch (error) {
      next(error);
    }
  });
};
