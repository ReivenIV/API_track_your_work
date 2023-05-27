require('dotenv').config();
const bcrypt = require('bcrypt');
//Generates Salt
const saltRounds = bcrypt.genSaltSync(parseFloat(process.env.JWT_SALT_ROUNDS));
const jwt = require('jsonwebtoken');

// --------------------
//     user Models
// --------------------

module.exports = (_db) => {
  db = _db;
  return UserModel;
};

class UserModel {
  static async getByEmailOrUsername(data) {
    const query =
      'SELECT * FROM `api_db_track`.`users` WHERE (email = ? OR username = ?)';
    const response = await db.query(query, [data.email, data.username]);

    return response[0];
  }

  static async getByUserId(id) {
    const query = 'SELECT * FROM `api_db_track`.`users` WHERE id = ?;';
    const response = await db.query(query, [id]);
    return response[0];
  }

  static async registerUser(data) {
    const passwordHash = await bcrypt.hash(data.password, saltRounds);

    const response = await db.query(
      'INSERT INTO `api_db_track`.`users` (`username`, `password`, `email`, `created_at`,`timezone`, `role`) VALUES (?,?, ?, NOW(), ?, "client")',
      [data.username, passwordHash, data.email, data.timezone],
    );
    return response;
  }

  static async authenticateUser(data) {
    let existingUser = await UserModel.getByEmailOrUsername(data);
    let token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET);

    return token;
  }
}
