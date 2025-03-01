import messageModel from "../../../DB/models/message.model.js";
import userModel from "../../../DB/models/user.model.js";




export const getMessages = async (req, res) => {
    const messageList = await messageModel.find({receiverId:req.authUser._id}).select("content createdAt");
    return res.json({message : messageList });
};

export const sendMessage = async (req, res) => {
    const { receiverId } = req.params;
    const { message } = req.body;
    const user = await userModel.findById(receiverId);
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    const createMessage = await messageModel.create({ content: message, receiverId });
    return res.status(201).json({ message: "success", createMessage });
};