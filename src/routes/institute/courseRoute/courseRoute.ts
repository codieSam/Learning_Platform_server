import express, {Router} from "express";
import isLoggedIn from "../../../middleware/middleware";
import asyncErrorHndler from "../../../services/asyncErrorHandler";
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/courseController";

// import {multer, storage} from "../../../middleware/multer.middleware"

// const upload = multer({storage: storage})
import multer from "multer";
import {cloudinary, storage} from "../../../services/cloudinaryConfig"

const upload = multer({storage: storage})

const router:Router = express.Router()
router.route('/')
// upload.single/array('filename -> frontend or postman bata k name vako field bata file aundai cha vanney specify garney')
.post(isLoggedIn,upload.single('courseThumbnail'), asyncErrorHndler(createCourse))
.get(asyncErrorHndler(getAllCourse))

router.route('/:id')
.get(asyncErrorHndler(getSingleCourse))
.delete(isLoggedIn, asyncErrorHndler(deleteCourse))

export default router