const authenticateToken = require('../../middlewares/authenticateToken.js');
const validator = require('./validator.js');
const errorHandler = require('../../middlewares/errorHandler.js');
// ---------------------------
//    track time Endpoints
// ---------------------------

module.exports = (app, db) => {
  const TrackTimeModel = require('../../models/track_time/TrackTimeModel')(db);

  app.post(
    '/api/v1/track_time/add',
    authenticateToken,
    validator,
    errorHandler,
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
    '/api/v1/track_time/data/:track_id',
    authenticateToken,
    errorHandler,
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

  app.put(
    '/api/v1/track_time/update/:track_id',
    authenticateToken,
    errorHandler,
    async (req, res, next) => {
      try {
        let responsePut = await TrackTimeModel.updateTrackById(
          req.body,
          req.params.track_id,
          req.id,
        );
        if (responsePut[0].affectedRows === 0) {
          return res.status(400).json({ msg: 'row not founded in DB' });
        }

        let responseGet = await TrackTimeModel.getTrackById(
          req.id,
          req.params.track_id,
        );

        return res.status(200).json({
          affectedRows: responsePut[0].affectedRows,
          id: req.params.track_id,
          msg: 'row aupdated',
          time_start: req.body.time_start,
          time_end: req.body.time_end,
          time_spend: responseGet[0][0].time_spend,
        });
      } catch (error) {
        next(error);
      }
    },
  );

  app.delete(
    '/api/v1/track_time/delete/:track_id',
    authenticateToken,
    errorHandler,
    async (req, res, next) => {
      try {
        let responseDelete = await TrackTimeModel.deleteOneTrack(
          req.id,
          req.params.track_id,
        );
        if (responseDelete[0].affectedRows === 0) {
          return res.status(400).json({ msg: 'row not founded in DB' });
        }

        return res.status(200).json({
          affectedRows: responseDelete[0].affectedRows,
          id: req.params.track_id,
          msg: 'row deleted',
        });
      } catch (error) {
        next(error);
      }
    },
  );
};
