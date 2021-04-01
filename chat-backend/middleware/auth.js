const jwt = require("jsonwebtoken");
const config = require("../config/app");

exports.auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Authentication is required" });
  }

  try {
    const userPayload = await jwt.verify(token, config.appKey);
    req.user = userPayload;

    next();
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};
