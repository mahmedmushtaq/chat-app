const router = require("express").Router();
const authRouter = require("./auth");

router.get("/home", (req, res) => {
  res.send("hello world");
});

router.use("/", authRouter);

module.exports = router;
