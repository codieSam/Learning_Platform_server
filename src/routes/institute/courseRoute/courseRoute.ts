import express, {Router} from "express";
import isLoggedIn from "../../../middleware/middleware";
import asyncErrorHndler from "../../../services/asyncErrorHandler";
import { createCourse } from "../../../controller/institute/instituteController";
import { deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/courseController";

const router:Router = express.Router()
router.route('/')
.post(isLoggedIn,asyncErrorHndler(createCourse))
.get(asyncErrorHndler(getAllCourse))

router.route('/:id')
.get(asyncErrorHndler(getSingleCourse))
.delete(isLoggedIn, asyncErrorHndler(deleteCourse))

export default router