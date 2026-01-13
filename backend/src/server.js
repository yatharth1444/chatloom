import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import path from 'path'
dotenv.config()
const __dirname = path.resolve()
const port = process.env.PORT
const server = express()
server.use('/api/auth', authRoutes)
if(process.env.NODE_ENV === 'production'){
    server.use(express.static(path.join (__dirname, "../frontend/dist")))
}
server.use('/routes/message', messageRoutes)
server.listen((port), ()=> console.log(`Server listens at port ${port} `))