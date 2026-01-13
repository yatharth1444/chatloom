import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
dotenv.config()
const port = process.env.PORT
const server = express()
server.use('/api/auth', authRoutes)

server.use('/routes/message', messageRoutes)
server.listen((port), ()=> console.log(`Server listens at port ${port} `))