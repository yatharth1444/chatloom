import express from "express"
import { authcontroller,loginController, logoutController } from "../controllers/auth.controller.js"
const router = express.Router()


router.post('/signup', authcontroller)

router.post('/login', loginController)
router.post('/logout',logoutController )

export default router