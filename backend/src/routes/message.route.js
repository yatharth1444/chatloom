import express from 'express'
import {getAllUsers} from '../controllers/message.controller.js'
import { protectRoute } from '../middlewares/authentication.middleware.js'
import {arcjetProtection} from "../middlewares/arcjet.middleware.js"
const router = express.Router()
router.use(arcjetProtection, protectRoute)
router.get('/contacts', getAllUsers)
router.get('/chats', getChatPartners())
router.get('/:id', getMessagesByUserId)
router.post('/send/:id', sendMessage)
export default router