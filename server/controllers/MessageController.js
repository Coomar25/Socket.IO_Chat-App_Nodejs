import MessageModel from "../models/messageModel.js";

export const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    console.error("an error occured while creating the chat");
  }
};

export const getMessage = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await MessageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
