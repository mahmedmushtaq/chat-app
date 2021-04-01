const User = require("../models").User;

exports.update = async (req, res) => {
  if (req.file && req.file.filename) {
    req.body.avatar = req.file.filename;
  }

  try {
    const [rows, result] = await User.update(req.body, {
      where: {
        id: req.user.id,
      },
      returning: true, // return update rows result
      idividualHooks: true, // will execute hooks
    });

    const user = result[0].get({ raw: true });
    user.avatar = result[0].avatar;
    delete user.password;
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }

  return res.send(req.body);
};
