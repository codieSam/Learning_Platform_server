import multer from "multer";
import {cloudinary, storage} from "../services/cloudinaryConfig"
import { Request } from "express";

//cb -> callbackFunction ->(success, error)

const upload = multer({storage: storage,

    fileFilter:(req:Request,file: Express.Multer.File, cb)=>{
        const allowsFileType = ['image/png', 'image/jpg', 'image/jpeg']
        if(allowsFileType.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error("Only image is supported !"))
        }
    
  
    },
   
})

export default upload


// import {multer, storage} from "../../../middleware/multer.middleware"

// // const upload = multer({storage: storage})
// import multer from "multer";
// import {cloudinary, storage} from "../../../services/cloudinaryConfig"

// //cb -> callbackFunction ->(success, error)

// const upload = multer({storage: storage,
//     fileFilter:(req:Request,file: Express.Multer.File, cb)=>{
//         const allowsFileType = ['image/png', 'image/jpg', 'image/jpeg']
//         if(allowsFileType.includes(file.mimetype)){
//             cb(null, true)
//         }else{
//             cb(new Error("Only image is supported !"))
//         }
    
  
//     },
//     // limits : {
//     //     fileSize: 2 * 1024 * 1024
//     // }
// })