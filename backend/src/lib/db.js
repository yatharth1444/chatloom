import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectdb = async()=>{
    try {
        const {MONGO_URI } = ENV
        if(!MONGO_URI) throw new Error("Mongo_URI is not set")
        const conn = await mongoose.connect(MONGO_URI) 
        console.log("mongodb connected ", conn.connection.host);
        
    } catch (error) {
        console.log("error", error);
        process.exit(1)
        
    }
}