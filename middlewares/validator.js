// ---------------------------
//    validator middleware
// ---------------------------

class validatorModel {
  static validatorUser(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ msg: 'Invalid email format' });
    }
    next();
  }

  //* validator track
  static validatorTrack(req, res, next) {
    const timestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    if (
      !timestampRegex.test(req.body.time_start) ||
      !timestampRegex.test(req.body.time_end)
    ) {
      return res.status(400).json({ msg: 'Invalid timestamp format' });
    }

    if (typeof req.body.timezone !== 'string' || !req.body.timezone) {
      return res.status(400).json({ msg: 'Invalid timezone format' });
    }

    if (req.body.tag === '' || req.body.tag === null) {
      return res.status(400).json({ msg: 'Invalid notes format' });
    }

    if (req.body.tag === '' || req.body.tag === null) {
      return res.status(400).json({ msg: 'Invalid tag format' });
    }
    next();
  }
}
module.exports = validatorModel;
