const express = require("express");
const config = require("./config/app");
const router = require("./routes");
const bodyParse = require("body-parser");

const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.use(router);

const port = config.port;
app.listen(port, () => {
  console.log(`app is listening on the port ${port}`);
});
