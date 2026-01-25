import express from "express"
import {arcjetProtection} from "../middlewares/arcjet.middleware.js"
import { authcontroller, loginController, logoutController, updateProfileController} from "../controllers/auth.controller.js"
import {protectRoute} from '../middlewares/authentication.middleware.js'

const router = express.Router()

// router.use(arcjetProtection)
router.post('/signup', authcontroller)

router.post('/login', loginController)
router.post('/logout', logoutController)
router.put('/update-profile', protectRoute, updateProfileController)
router.get('/check', protectRoute, (req, res)=> res.status(200).json(req.user))
export default router