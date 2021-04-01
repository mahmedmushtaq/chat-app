const { Op } = require("sequelize");
const { sequelize } = require("../models");
const model = require("../models");
const { User, Chat, ChatUser, Message } = model;

exports.Index = async (req, res) => {
  // retreive all chats, to whom he was chatting (not include himself) and messages

  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
    include: [
      {
        model: Chat,
        include: [
          {
            model: User,
            where: {
              [Op.not]: {
                id: req.user.id,
              },
            },
          },
          {
            model: Message,
            include: [
              {
                model: User,
              },
            ],
            limit: 20,
            order: [["id", "DESC"]],
          },
        ],
      },
    ],
  });

  return res.send(user.Chats);
};

exports.create = async (req, res) => {
  const { partnerId } = req.body;
  const t = await sequelize.transaction();
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: [
        {
          model: Chat,
          where: { type: "dual" },
          include: [{ model: ChatUser, where: { userId: partnerId } }],
        },
      ],
    });

    if (user && user.Chats.length > 0) {
      return res.status(403).send({
        status: "error",
        message: "Chat with this user is already present",
      });
    }

    const chat = await Chat.create({ type: "dual" }, { transaction: t });

    await ChatUser.bulkCreate(
      [
        {
          chatId: chat.id,
          userId: req.user.id,
        },
        {
          chatId: chat.id,
          userId: partnerId,
        },
      ],
      { transaction: t }
    );

    await t.commit();

    const chatNew = await Chat.findOne({
      where: {
        id: chat.id,
      },
      include: [
        {
          model: User,
          where: {
            [Op.not]: {
              id: req.user.id,
            },
          },
        },
        {
          model: Message,
        },
      ],
    });

    return res.send(chatNew);
  } catch (err) {
    await t.rollback();
    return res.status(500).send({ status: "Error", message: err.message });
  }
};

exports.messages = async (req, res) => {
  const limit = 10;
  const page = req.query.page || 1;
  const offset = page > 1 ? page * limit : 0; // how many records needs to skip

  const messages = await Message.findAndCountAll({
    where: {
      chatId: req.query.id,
    },
    include: [
      {
        model: User,
      },
    ],
    limit,
    offset,
    order: [["id", "DESC"]],
  });

  const totalPages = Math.ceil(messages.count / limit);

  if (page > totalPages) return res.json({ data: { messages: [] } });

  const result = {
    messages: messages.rows,
    pagination: {
      page,
      totalPages,
    },
  };

  return res.json(result);
};

exports.deleteChat = async (req, res) => {
  const { id } = req.params;

  try {
    const chat = await Chat.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    const notifyUsers = chat.Users.map((user) => user.id);

    await chat.destroy();
    return res.json({ chatId: id, notifyUsers });
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message });
  }
};
<<<<<<< HEAD

exports.imageUpload = (req, res) => {
  if (req.file) {
    return res.send({ url: req.file.filename });
  }

  return res.status(500).send({ error: "No image is uploaded" });
};
=======
>>>>>>> 9ce133aa0a30768ff4d06e8b347751f43dfe7b98
