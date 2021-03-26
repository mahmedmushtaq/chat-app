require("dotenv").config();
module.exports = {
  port: process.env.PORT,
  appUrl: process.env.APP_URL,
  appKey: process.env.APP_KEY,
};
