import { ENV } from "../lib/env";
import jwt from "jsonwebtoken"
import User from "../models/User";

export const protectRoute = async (req, res, next) => {
    try {
        const token = res.cookie.jwt
        if(!token) return res.status(401).json({message: "Unauthorized: No token provided"})
        const decoded  =  jwt.verify(token, ENV.JWT_SECRET_KEY)
        if(!decoded) return res.status(401).json({message: "Unauthorized: No token provided"})
        const findUser = await User.findById(decoded.userId).select('-password')
        if(!findUser) return res.status(400).json({message: "User doesn't exists"})
        req.user = findUser
        next()
    } catch (error) {
        console.log("error in protect route", error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}