import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import path from 'path'
import { connectdb } from './lib/db.js'
dotenv.config()
const __dirname = path.resolve()
const port = process.env.PORT
const server = express()
server.use(express.json())
server.use('/api/auth', authRoutes)
if(process.env.NODE_ENV === 'production'){
    server.use(express.static(path.join (__dirname, "../../frontend/dist")))
    server.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
    })
}

server.use('/routes/message', messageRoutes)
server.listen((port), ()=> {
    console.log(`Server listens at port ${port} `)
    connectdb()
})