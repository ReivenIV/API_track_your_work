// ------------------------
//    Track Time Model
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

  static async updateTrackById(data, trackId, userId) {
    const query =
      'UPDATE `api_db_track`.`track_time` SET `time_start`=?, `time_end`= ?, `time_spend` = TIMEDIFF(?, ?), `updated_at` = NOW(), `timezone` = ?, `notes` = ?, `tag` = ? \
     WHERE (`id` = ? AND `user_id`=?);';

    const response = await db.query(query, [
      data.time_start,
      data.time_end,
      //calcul time_spend TIMEDIFF(time_end time_start)
      data.time_end,
      data.time_start,
      data.timezone,
      data.notes,
      data.tag,
      trackId,
      userId,
    ]);
    return response;
  }

  static async getAllData(userId) {
    const query =
      'SELECT * FROM `api_db_track`.`track_time` WHERE `user_id`=?;';

    const response = await db.query(query, [userId]);
    return response;
  }

  static async deleteOneTrack(userId, trackId) {
    const query =
      'DELETE FROM `api_db_track`.`track_time` WHERE (`user_id`=? AND`id` = ?);';

    const response = await db.query(query, [userId, trackId]);

    return response;
  }
}
