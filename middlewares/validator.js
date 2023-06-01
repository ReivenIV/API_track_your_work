// ---------------------------
//    validator middleware
// ---------------------------

class validatorModel {


  static validatorRegister(req, res, next) {

    if (!req.body.username || !req.body.password || !req.body.role || !req.body.email || !req.body.timezone ) {
      return res.status(400).json({ msg: 'Missing credentials in payload' });
    }

    if (typeof req.body.username !== "string"|| typeof req.body.password !== "string"|| typeof req.body.role !== "string"|| typeof req.body.email !== "string"|| typeof req.body.timezone !== "string") {
      return res.status(400).json({ msg: 'Invalid credentials in format'});      
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
