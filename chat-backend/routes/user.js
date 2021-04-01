const router = require("express").Router();
const { update } = require("../controllers/userController");
const { auth } = require("../middleware/auth");
const { userFile } = require("../middleware/fileUpload");
const authRouter = require("./auth");

router.post("/update", [auth, userFile], update);

module.exports = router;
