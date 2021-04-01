const express = require("express");
const config = require("./config/app");
const router = require("./routes");
const bodyParse = require("body-parser");
const cors = require("cors");
const SocketServer = require("./socket");
const http = require("http");

const app = express();
app.use(cors());

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

app.use(router);

const server = http.createServer(app);
SocketServer(server);

const port = config.port;
server.listen(port, () => {
  console.log(`app is listening on the port ${port}`);
});
