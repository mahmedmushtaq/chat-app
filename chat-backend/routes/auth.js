const router = require("express").Router();
const { login, register } = require("../controllers/authController");
const { validate } = require("../validator/validate");
const { rules: registrationRules } = require("../validator/auth/registration");
const { rules: loginRules } = require("../validator/auth/login");

router.post("/login", loginRules, validate, login);

router.post("/register", registrationRules, validate, register);

module.exports = router;
