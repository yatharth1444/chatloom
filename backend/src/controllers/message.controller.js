import Message from "../models/message.js";
import User from "../models/User.js";
import cloudinary from "cloudinary"
export const getAllUsers = async(req, res) => {
    try {
        const loggedInUser = req.user._id
        const filterUsers = await User.find({_id:{$ne : loggedInUser}}).select("-password")
        res.status(200).json(filterUsers)
    } catch (error) {
        console.log("error", error);
        res.status(500).json({message : "Internal server error"})
    }
}
export const getMessageByUserId = async(req, res) =>{
    const {id: userToChatId} = req.params
    const myId = req.user._id
    try {
    const findUser = await User.find({
        $or:[
            {senderId: myId, receiverId: userToChatId},
            {senderId: userToChatId, receiverId:myId },
        ]
    })
    res.status(201).json(findUser)
} catch (error) {
    console.log("error", error);
    res.status(500).json({message:"Internal Server error"})
}
}
export const sendMessage = async(req, res)=>{
try {
    const senderId = req.user._id
    const {id : receiverId} =  req.params
    const {text, image } = req.body
    if(!text && !image){
        return res.status(400).json({message: "No text provided to be sent"})
    }
    if(senderId === receiverId){
        return res.status(400).json({message: "cant send message to yourself"})
    }
    const receiverExists = await User.exists({_id : receiverId})
    if(!receiverExists) return res.status(404).json({message: "Receiver doesn't exist"})
    let imageUrl
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url
    }
    const newMessage = new Message(
        {
            senderId,
            receiverId,
            text,
            image: imageUrl,
        }
    )
    await newMessage.save()
    res.status(201).json(newMessage)
} catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
}
}
export const getChatPartners = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const chatPartnersMessage = await Message.find({$or: [{senderId: loggedInUser}, {receiverId: loggedInUser}]})
        const chatPartnersIds = [
            ...new Set(
                chatPartnersMessage.map((msg)=>{
                    msg.senderId.toString() === loggedInUser.toString()
                    ? msg.receiverId.toString()
                    : msg.senderId.toString()
                })
            )
        ]
        const chatPartners = await User.find({_id: {$in: chatPartnersIds}}).select('-password')
        res.status(200).json(chatPartners)
    } catch (error) {
        console.log("Error",error.message);
        return res.status(500).json({message: "Internal Server Error"})
    }
}