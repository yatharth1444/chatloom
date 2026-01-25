import express from 'express'
import {getAllUsers, getChatPartners, sendMessage, getMessageByUserId} from '../controllers/message.controller.js'
import { protectRoute } from '../middlewares/authentication.middleware.js'
import {arcjetProtection} from "../middlewares/arcjet.middleware.js"
const router = express.Router()
router.use( protectRoute)
router.get('/contacts', getAllUsers)
router.get('/chats', getChatPartners)
router.get('/:id', getMessageByUserId)
router.post('/send/:id', sendMessage)
export default router