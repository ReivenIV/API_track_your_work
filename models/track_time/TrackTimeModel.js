/* query Example 
INSERT INTO `api_db_track`.`track_time` (`id`, `user_id`, `time_start`, `time_end`, `time_spend`, `created_at`, `updated_at`, `timezone`, `notes`, `tag`) 
VALUES ('1', '10', '2023-05-30 10:00:00', '2023-05-30 11:30:00', TIMEDIFF('2023-05-30 11:30:00', '2023-05-30 10:00:00'), '2023-05-30 10:00:00', NULL, 'europe/paris', NULL, NULL);
*/
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = bcrypt.genSaltSync(parseFloat(process.env.JWT_SALT_ROUNDS));
const jwt = require('jsonwebtoken');

// ------------------------
//     Track Time Model
// ------------------------

module.exports = (_db) => {
  db = _db;
  return TrackTimeModel;
};

class TrackTimeModel {
  static async addTimeTrack(data, userId) {
    const query =
      ' INSERT INTO `api_db_track`.`track_time` (`user_id`, `time_start`, `time_end`, `time_spend`, `created_at`, `timezone`, `notes`, `tag`) \
      VALUES ( ?, ?, ?, TIMEDIFF(?, ?), NOW(), ?, ?, ?);';

    const response = await db.query(query, [
      userId,
      data.time_start,
      data.time_end,
      //calcul time_spend TIMEDIFF(time_end time_start)
      data.time_end,
      data.time_start,
      data.timezone,
      data.notes,
      data.tag,
    ]);
    return response;
  }

  static async getTrackById(userId, trackId) {
    const query =
      'SELECT * FROM `api_db_track`.`track_time` WHERE user_id=? AND id=?;';

    const response = await db.query(query, [userId, trackId]);

    return response;
  }
}
