const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = require("../config/app");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // find user
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).send({ message: "Incorrect credentials" });

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(404).send({ message: "Incorrect credentials" });
    }

    //  return res.send(user);
    // generate token
    const token = generateToken(user.get({ raw: true }));
    token.user.avatar = user.avatar;
    return res.send(token);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
  return res.send(req.body);
};

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = generateToken(user.get({ raw: true }));
    token.avatar = user.avatar;
    return res.send(token);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }``
  return res.send(req.body);
};

const generateToken = (user) => {
  delete user.password;
  const token = jwt.sign(user, key.appKey);
  return { ...{ user }, ...{ token } };
};
