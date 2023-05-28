require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../../middlewares/authenticateToken.js');
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

  app.post('/api/v1/user/login', async (req, res, next) => {
    try {
      let userData = await userModel.getByEmailOrUsername(req.body);

      if (userData[0].length === 0) {
        return res.status(401).json({ msg: 'invalid credentials' });
      }
      let resultTest = await userModel.testCredentials(
        req.body.password,
        userData[0].password,
      );
      if (resultTest === false) {
        return res.status(401).json({ msg: 'invalid credentials' });
      }

      let token = await userModel.authenticateUser(req.body);

      return res.status(200).json({ user_id: userData[0].id, token: token });
    } catch (error) {
      next(error);
    }
  });

  // will SELECT all data by user id.
  app.get('/api/v1/user/data', authenticateToken, async (req, res, next) => {
    try {
      let userData = await userModel.getByUserId(req.id);
      if (userData.length === 0) {
        return res
          .status(401)
          .json({ msg: 'user not found in DB / credentials not valid' });
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

  app.put('/api/v1/user/update', authenticateToken, async (req, res, next) => {
    try {
      let updatedData = await userModel.updateUser(req.body, req.id);

      if (updatedData.affectedRows === 0) {
        res.status(400).json({
          msg: 'user not updated',
          affectedRows: updatedData[0].affectedRows,
        });
      }

      res
        .status(200)
        .json({
          msg: 'user updated',
          affectedRows: updatedData[0].affectedRows,
        });
    } catch (error) {
      next(error);
    }
  });
};
