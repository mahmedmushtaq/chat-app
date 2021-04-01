const router = require("express").Router();
const {
  Index,
  create,
  messages,
  deleteChat,
  imageUpload,
} = require("../controllers/chatController");
const { auth } = require("../middleware/auth");
const { chatFile } = require("../middleware/fileUpload");

router.get("/", auth, Index);
router.get("/messages", auth, messages);
router.post("/create", auth, create);
router.post("/upload-image", auth, chatFile, imageUpload);
router.delete("/:id", auth, deleteChat);

module.exports = router;
