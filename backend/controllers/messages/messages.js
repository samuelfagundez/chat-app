const Message = require("../../database/models/message");
var ObjectId = require("mongoose").Types.ObjectId;

const obtainChat = async (req, res) => {
  const id = req.uid;

  const messagesFrom = req.params.from;

  if (!ObjectId.isValid(messagesFrom)) {
    res.json({
      ok: false,
      messages: "Invalid user id",
    });
  } else {
    const last30 = await Message.find({
      $or: [
        { from: id, to: messagesFrom },
        { from: messagesFrom, to: id },
      ],
    })
      .sort({ createdAt: "desc" })
      .limit(30);

    res.json({
      ok: true,
      messages: last30,
    });
  }
};

module.exports = obtainChat;
