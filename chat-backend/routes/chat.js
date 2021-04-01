const router = require("express").Router();
const {
  Index,
  create,
  messages,
  deleteChat,
<<<<<<< HEAD
  imageUpload,
} = require("../controllers/chatController");
const { auth } = require("../middleware/auth");
const { chatFile } = require("../middleware/fileUpload");
=======
} = require("../controllers/chatController");
const { auth } = require("../middleware/auth");
>>>>>>> 9ce133aa0a30768ff4d06e8b347751f43dfe7b98

router.get("/", auth, Index);
router.get("/messages", auth, messages);
router.post("/create", auth, create);
<<<<<<< HEAD
router.post("/upload-image", auth, chatFile, imageUpload);
=======
>>>>>>> 9ce133aa0a30768ff4d06e8b347751f43dfe7b98
router.delete("/:id", auth, deleteChat);

module.exports = router;
