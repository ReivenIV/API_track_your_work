require('dotenv').config();
const authenticateToken = require('../../middlewares/authenticateToken.js');
const secret = process.env.JWT_SECRET;

module.exports = (app, db) => {
  const TrackTimeModel = require('../../models/track_time/TrackTimeModel')(db);

  app.post(
    '/api/v1/track_time/add',
    authenticateToken,
    async (req, res, next) => {
      try {
        let responseAdd = await TrackTimeModel.addTimeTrack(req.body, req.id);

        if (responseAdd[0].affectedRows === 0) {
          res.status(400).json({
            msg: 'user not updated',
            affectedRows: responseAdd[0].affectedRows,
          });
        }
        let responseGet = await TrackTimeModel.getTrackById(
          req.id,
          responseAdd[0].insertId,
        );

        return res.status(200).json({
          id: responseAdd[0].insertId,
          user_id: req.id,
          msg: 'information added to DB',
          time_spend: responseGet[0][0].time_spend,
        });
      } catch (error) {
        next(error);
      }
    },
  );

  app.get(
    '/api/v1/track_time/get_by_id/:track_id',
    authenticateToken,
    async (req, res, next) => {
      try {
        let responseGet = await TrackTimeModel.getTrackById(
          req.id,
          req.params.track_id,
        );

        return res.status(200).json(responseGet[0][0]);
      } catch (error) {
        next(error);
      }
    },
  );
};
