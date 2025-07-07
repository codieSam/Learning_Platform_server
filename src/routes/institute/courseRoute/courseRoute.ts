import express, {Request, Router} from "express";
import isLoggedIn from "../../../middleware/middleware";
import asyncErrorHndler from "../../../services/asyncErrorHandler";
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/courseController";
import upload from "../../../services/multerUpload";



const router:Router = express.Router()
router.route('/')
// upload.single/array('filename -> frontend or postman bata k name vako field bata file aundai cha vanney specify garney')
.post(isLoggedIn,upload.single('courseThumbnail'), asyncErrorHndler(createCourse))
.get(isLoggedIn,asyncErrorHndler(getAllCourse))

router.route('/:id')
.get(isLoggedIn, asyncErrorHndler(getSingleCourse))
.delete(isLoggedIn, asyncErrorHndler(deleteCourse))

export default router