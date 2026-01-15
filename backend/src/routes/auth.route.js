import express from "express"
import { authcontroller } from "../controllers/auth.controller.js"
const router = express.Router()


router.post('/signup', authcontroller)


router.get('/logout', (req, res)=>{
    res.send('logout endpoint')
})

export default router