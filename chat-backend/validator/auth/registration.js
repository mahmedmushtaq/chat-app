const { body } = require("express-validator");

exports.rules = (() => {
  return [
    body("firstName").notEmpty().withMessage("First Name is required"),
    body("lastName").notEmpty().withMessage("last Name is required"),
    body("email").isEmail(),
    body("password").notEmpty().withMessage("password is required"),
    body("gender").notEmpty().withMessage("gender is required"),
  ];
})();
