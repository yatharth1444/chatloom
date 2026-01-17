import express from 'express'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import path from 'path'
import { connectdb } from './lib/db.js'
import { ENV } from './lib/env.js'
import cookieParser from "cookie-parser"
const __dirname = path.resolve()
const port = ENV.PORT
const server = express()
server.use(express.json())
server.use(cookieParser())
server.use('/api/auth', authRoutes)
if(ENV.NODE_ENV === 'production'){
    server.use(express.static(path.join (__dirname, "../../frontend/dist")))
    server.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
    })
}

server.use('/routes/message', messageRoutes)
connectdb()
    .then(()=>{
    server.listen((port), ()=> {
    console.log(`Server listens at port ${port} `)
})})
    .catch((error)=>{
    console.log("ailed to connect DB");
    
})