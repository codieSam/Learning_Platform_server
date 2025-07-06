import express, {Request, Router} from "express";
import isLoggedIn from "../../../middleware/middleware";
import asyncErrorHndler from "../../../services/asyncErrorHandler";
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/courseController";

// import {multer, storage} from "../../../middleware/multer.middleware"

// const upload = multer({storage: storage})
import multer from "multer";
import {cloudinary, storage} from "../../../services/cloudinaryConfig"

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
    // limits : {
    //     fileSize: 2 * 1024 * 1024
    // }
})

const router:Router = express.Router()
router.route('/')
// upload.single/array('filename -> frontend or postman bata k name vako field bata file aundai cha vanney specify garney')
.post(isLoggedIn,upload.single('courseThumbnail'), asyncErrorHndler(createCourse))
.get(isLoggedIn,asyncErrorHndler(getAllCourse))

router.route('/:id')
.get(isLoggedIn, asyncErrorHndler(getSingleCourse))
.delete(isLoggedIn, asyncErrorHndler(deleteCourse))

export default router