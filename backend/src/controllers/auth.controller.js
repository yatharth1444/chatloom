import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import {sendWelcomeEmail} from '../emails/emailHandlers.js'
import { ENV } from "../lib/env.js";
import  cloudinary  from "../lib/cloudinary.js"
export  const authcontroller =  async(req, res)=>{
    const {fullname, email, password}  = req.body
    try {
        if(!fullname){
            return res.status(400).json({message: "Enter fullname "})
        }
        if (!password || password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
        });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Enter valid mail."})
        }
        const user = await User.findOne({email: email})
        if(user){
            return res.status(400).json({message: "User already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hassedPassword = await bcrypt.hash(password, salt)
        const newUser = new User ({
            fullname,
            email,
            password: hassedPassword
        })
        if(newUser){
            const savedUser = await newUser.save()
            generateToken(savedUser._id, res)
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic : newUser.profilePic,
            })
            try {
            await sendWelcomeEmail(savedUser.fullname, savedUser.email, ENV.CLIENT_URL)
            } catch (error) {
            console.error("Failed to send welcome email:", error);
            }
        }else{
            res.status(400).json({message: "invalid user data"})
        }
    } catch (error) {
        console.log("error in signup", error);
        
    }
}
export const loginController = async(req, res)=>{
    const {email, password} = req.body
    if (!email || !password){
        res.status(400).json({message: "Either password or email is not provided."})
    }
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword) return res.status(400).json({message: "Invalid credentials"})
        generateToken(user._id, res)
        res.status(200).json({
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                profilePic : user.profilePic,
            })
    } catch (error) {
        console.log("error in login", error);
        res.status(500).json({message: "internal server error"})
        
    }
}
export const logoutController = (_, res) =>{
    res.cookie("jwt", "", {maxAge: 0})
    res.status(200).json({message: "Logout successful"})
}
export const updateProfileController = async(req, res)=>{
    try {
        const {profilePic} = req.body
        if(!profilePic) return res.status(400).json({message: "Profile pic is required"})
        const userId = req.user._id
        const uploadPic = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:  uploadPic.secure_url}, {new : true})
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in update profile");
        res.status(500).json({message: "Internal Server Error"})
    }
}