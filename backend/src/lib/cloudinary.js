import {v2 as cloudinary} from "cloudinary"
import { ENV } from "./env.js"
cloudinary.config({
    cloud_name : ENV.CLOUDINARY_NAME,
    cloud_api_key: ENV.CLOUDINARY_API_KEY,
    cloud_api_secret: ENV.CLOUDINARY_API_SECRET,
    }
)
export default cloudinary