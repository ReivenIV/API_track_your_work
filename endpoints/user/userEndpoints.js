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
        return res
          .status(401)
          .json({ msg: 'email or username already stored in DB' });
      }
      const resgiterResponse = await userModel.registerUser(req.body);
      let token = await userModel.authenticateUser(req.body);

      return res.status(200).json({
        user_id: resgiterResponse[0].insertId,
        msg: 'User aded to database',
        token: token,
      });
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/v1/user/data', async (req, res, next) => {
    try {
      let userData = await userModel.getByUserId(req.body.user_id);

      if(userData.length === 0){
       return res
          .status(401)
          .json({ msg: "user not found in DB" });   
      }

      return res.status(200).json({
        user_id: userData[0].id,
        username: userData[0].username,
        email: userData[0].email,
        created_at: userData[0].created_at,
        updated_at: userData[0].updated_at,
        timezone: userData[0].timezone,
        role: userData[0].role,
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
