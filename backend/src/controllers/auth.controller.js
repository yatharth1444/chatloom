import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
export  const authcontroller =  async(req, res)=>{
    const {fullname, email, password}  = req.body
    try {
        if(!fullname){
            return res.status(400).json({message: "Enter fullname "})
        }
        if(password.length < 6){
            return res.status(400).json({message: "Entered password should be atleast 6 characters "})
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Enter valid mail."})
        }
        const user = await User.findOne({email})
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
            return res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic : newUser.profilePic,
            })
        }else{
            res.status(400).json({message: "invalid user data"})
        }


    } catch (error) {
        console.log("error in signup", error);
        
    }
}