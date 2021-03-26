const { validationResult } = require("express-validator");

exports.validate = async (req, res, next) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors);
  }
  next();
};
