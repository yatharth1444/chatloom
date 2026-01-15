import mongoose from "mongoose";

export const connectdb = async()=>{
    try {
        const {MONGO_URI } = process.env
        if(!MONGO_URI) throw new Error("Mongo_URI is not set")
        const conn = await mongoose.connect(process.env.MONGO_URI) 
        console.log("mongodb connected ", conn.connection.host);
        
    } catch (error) {
        console.log("error", error);
        process.exit(1)
        
    }
}