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
        let response = await TrackTimeModel.addTimeTrack(req.body, req.id);
        if (response[0].affectedRows === 0) {
          res.status(400).json({
            msg: 'user not updated',
            affectedRows: response[0].affectedRows,
          });
        }

        return res.status(200).json({
          user_id: req.id,
          msg: 'information added to DB',
        });
      } catch (error) {
        next(error);
      }
    },
  );
};
