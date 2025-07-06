import {v2 as cloudinary} from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import { envConfig } from "../config/config"

//configuration for cloudinary
cloudinary.config({
    cloud_name: envConfig.cloudinaryCloudName, 
    api_key: envConfig.cloudinaryApiKey, 
    api_secret: envConfig.cloudinarySecretKey // Click 'View API Keys' above to copy your API secret
})

//storage configration

const storage = new CloudinaryStorage ({
    cloudinary, 
    params: async (req,file)=>({
        folder: "learning-platform"
    })
})

export {cloudinary, storage}