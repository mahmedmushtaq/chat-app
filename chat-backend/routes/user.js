const router = require("express").Router();
const { update, search } = require("../controllers/userController");
const { auth } = require("../middleware/auth");
const { userFile } = require("../middleware/fileUpload");
const authRouter = require("./auth");

router.post("/update", [auth, userFile], update);
router.get("/search-users", auth, search);

module.exports = router;
