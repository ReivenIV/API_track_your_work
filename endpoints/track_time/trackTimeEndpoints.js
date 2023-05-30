require('dotenv').config();
const authenticateToken = require('../../middlewares/authenticateToken.js');
const secret = process.env.JWT_SECRET;

module.exports = (app, db) => {
  const TrackTimeModel = require('../../models/user/UserModel')(db);

  
};
